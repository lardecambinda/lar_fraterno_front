import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";

export default function Nav() {
  return (
    <nav className="w-full border-b border-[var(--violet)] bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-screen-lg mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" title="Lar Fraterno de Cambinda" className="flex items-center gap-2.5 shrink-0">
          <Image
            alt="logo"
            width={36}
            height={36}
            src="/images/larFraternoIconBlack.png"
            className="rounded-md"
            priority
          />
          <span className="text-sm font-semibold text-[var(--black)] leading-tight hidden sm:block">
            Lar Fraterno<br />
            <span className="font-normal text-xs text-gray-500">de Cambinda</span>
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-sm">
          <Searchbar />
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/reunioes"
            className="text-sm font-medium text-gray-700 hover:text-[var(--secondary)] transition-colors"
          >
            Reuniões
          </Link>
          <a
            href="mailto:lardecambinda@gmail.com"
            className="text-sm text-gray-500 hover:text-[var(--secondary)] transition-colors hidden md:block"
          >
            Contato
          </a>
        </div>
      </div>
    </nav>
  );
}
