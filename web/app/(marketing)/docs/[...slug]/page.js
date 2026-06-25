import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/docs/mdxComponents"
import PrevNext from "@/components/docs/PrevNext"
import { getDocBySlug, getAllDocSlugs } from "@/lib/docs"

export async function generateStaticParams() {
  return getAllDocSlugs()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  if (!slug || slug.length === 0) return {}
  const doc = getDocBySlug(slug)
  if (!doc) return {}
  return {
    title: doc.data.title,
    description: doc.data.description || undefined,
  }
}

export default async function DocPage({ params }) {
  const { slug } = await params

  // /docs/ raíz se maneja en /docs/page.js — este catch-all sólo aplica con slug
  if (!slug || slug.length === 0) notFound()
  if (slug.length !== 2) notFound()

  const doc = getDocBySlug(slug)
  if (!doc) notFound()

  return (
    <>
      <p className="text-xs font-medium uppercase tracking-wider text-primary/80 not-prose">
        {doc.section.label}
      </p>
      <MDXRemote source={doc.content} components={mdxComponents} />
      <PrevNext prev={doc.prev} next={doc.next} />
    </>
  )
}
