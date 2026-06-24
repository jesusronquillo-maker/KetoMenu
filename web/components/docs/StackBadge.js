const TECH_LABELS = {
  next: "Next.js",
  react: "React",
  tailwind: "Tailwind",
  daisyui: "DaisyUI",
  supabase: "Supabase",
  postgres: "Postgres",
  pgvector: "pgvector",
  auth: "Auth",
  openai: "OpenAI",
  langgraph: "LangGraph",
  mcp: "MCP",
  resend: "Resend",
  posthog: "PostHog",
  vercel: "Vercel",
  yarn: "yarn",
  cursor: "Cursor",
  github: "GitHub",
  esp: "ESP-Claw",
}

export default function StackBadge({ tech = [] }) {
  if (!tech || tech.length === 0) return null
  return (
    <div className="my-4 flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className="inline-flex items-center rounded-md border border-base-300 bg-base-200 px-2 py-0.5 text-xs font-medium text-base-content/70"
        >
          {TECH_LABELS[t] || t}
        </span>
      ))}
    </div>
  )
}
