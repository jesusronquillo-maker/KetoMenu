import Link from "next/link"
import config from "@/config"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-base-200 bg-base-100/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block size-7 rounded-lg bg-primary" aria-hidden />
          {config.brand.logoText}
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {config.landing.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-base-content/70 transition hover:text-base-content"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {config.features.googleAuth && (
            <Link href={config.auth.loginUrl} className="btn btn-sm btn-ghost">
              Entrar
            </Link>
          )}
          <Link href="#waitlist" className="btn btn-sm btn-primary">
            {config.landing.hero.cta.label}
          </Link>
        </div>
      </nav>
    </header>
  )
}
