import Link from "next/link";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/cars", label: "車輛列表" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 text-sm font-bold text-white">
            CD
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide">
              City Drive Motors
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              精選認證中古車
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-300 md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

