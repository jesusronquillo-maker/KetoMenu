import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

// docs-content vive en la raíz del monorepo, no dentro de /web
const DOCS_DIR = path.join(process.cwd(), "..", "docs-content")

// Nombres bonitos para las secciones top-level
const SECTION_LABELS = {
  intro: "Introducción",
  setup: "Setup",
  tutoriales: "Tutoriales por semana",
  features: "Features",
  componentes: "Componentes",
  recetas: "Recetas",
  deploy: "Deploy",
  troubleshooting: "Troubleshooting",
}

function stripOrderPrefix(name) {
  // "01-intro" → "intro", "semana-1-landing" se queda como está
  return name.replace(/^(\d+)[-_]/, "")
}

function humanize(slug) {
  return slug
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function readFrontmatter(filepath) {
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return { data, content }
}

/**
 * Devuelve el árbol de navegación para la sidebar de /docs.
 * Estructura: [{ slug, label, order, pages: [{ slug, label, order, href }] }]
 */
export function getDocsTree() {
  if (!fs.existsSync(DOCS_DIR)) return []

  const sections = fs
    .readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_") && !d.name.startsWith("."))

  return sections
    .map((dir) => {
      const sectionSlug = stripOrderPrefix(dir.name)
      const sectionDir = path.join(DOCS_DIR, dir.name)

      const files = fs
        .readdirSync(sectionDir, { withFileTypes: true })
        .filter((f) => f.isFile() && f.name.endsWith(".mdx"))

      const pages = files
        .map((f) => {
          const filepath = path.join(sectionDir, f.name)
          const { data } = readFrontmatter(filepath)
          const baseName = f.name.replace(/\.mdx$/, "")
          const pageSlug = stripOrderPrefix(baseName)
          return {
            slug: pageSlug,
            label: data.title || humanize(pageSlug),
            order: data.order ?? 999,
            description: data.description || null,
            href: `/docs/${sectionSlug}/${pageSlug}`,
          }
        })
        .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))

      return {
        slug: sectionSlug,
        label: SECTION_LABELS[sectionSlug] || humanize(sectionSlug),
        order: getSectionOrder(sectionSlug),
        pages,
      }
    })
    .sort((a, b) => a.order - b.order)
}

function getSectionOrder(slug) {
  // Orden canónico de las secciones top-level
  const ORDER = [
    "intro",
    "setup",
    "tutoriales",
    "features",
    "componentes",
    "recetas",
    "deploy",
    "troubleshooting",
  ]
  const idx = ORDER.indexOf(slug)
  return idx === -1 ? 999 : idx
}

/**
 * Devuelve { data, content } para un slug array ["seccion", "pagina"].
 * Si la página no existe, devuelve null.
 */
export function getDocBySlug(slugArray) {
  if (!slugArray || slugArray.length === 0) return null

  const tree = getDocsTree()
  const [sectionSlug, pageSlug] = slugArray

  const section = tree.find((s) => s.slug === sectionSlug)
  if (!section) return null

  // Encuentra el archivo real en disco (puede tener prefijo de orden)
  const dirEntries = fs
    .readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
  const realSectionDir = dirEntries.find((d) => stripOrderPrefix(d.name) === sectionSlug)
  if (!realSectionDir) return null

  const sectionPath = path.join(DOCS_DIR, realSectionDir.name)
  const files = fs.readdirSync(sectionPath).filter((f) => f.endsWith(".mdx"))
  const realFile = files.find((f) => stripOrderPrefix(f.replace(/\.mdx$/, "")) === pageSlug)
  if (!realFile) return null

  const filepath = path.join(sectionPath, realFile)
  const { data, content } = readFrontmatter(filepath)

  // Encuentra prev/next para navegación
  const allPages = tree.flatMap((s) => s.pages)
  const currentIdx = allPages.findIndex((p) => p.href === `/docs/${sectionSlug}/${pageSlug}`)
  const prev = currentIdx > 0 ? allPages[currentIdx - 1] : null
  const next = currentIdx < allPages.length - 1 ? allPages[currentIdx + 1] : null

  return {
    data,
    content,
    section: { slug: sectionSlug, label: section.label },
    page: { slug: pageSlug },
    prev,
    next,
  }
}

/**
 * Para generateStaticParams: devuelve todos los slugs como arrays [seccion, pagina]
 */
export function getAllDocSlugs() {
  return getDocsTree().flatMap((section) =>
    section.pages.map((page) => ({
      slug: [section.slug, page.slug],
    }))
  )
}
