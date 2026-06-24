import Sidebar from "@/components/docs/Sidebar"
import { getDocsTree } from "@/lib/docs"

export default function DocsLayout({ children }) {
  const tree = getDocsTree()
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <Sidebar tree={tree} activeHref={null} />
        </aside>
        <article className="prose-vf min-w-0">{children}</article>
      </div>
    </div>
  )
}
