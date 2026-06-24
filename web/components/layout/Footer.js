import Link from "next/link"
import config from "@/config"

export default function Footer() {
  return (
    <footer className="border-t border-base-200 bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block size-5 rounded-md bg-primary" aria-hidden />
          <span className="font-semibold">{config.brand.logoText}</span>
          <span className="text-sm text-base-content/60">— {config.landing.footer.tagline}</span>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {config.landing.footer.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-base-content/70 hover:text-base-content"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="text-base-content/50">© {new Date().getFullYear()}</li>
        </ul>
      </div>
    </footer>
  )
}
