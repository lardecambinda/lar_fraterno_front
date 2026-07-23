import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { FilesIcon } from "lucide-react";

export default function Nav() {
  return (
    <nav className="w-full border-b border-[var(--violet)] bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-screen-lg mx-auto px-4 py-4 md:py-0 md:h-16 md:flex-row md:flex grid grid-cols-2 items-center justify-between gap-8 flex-wrap">
        {/* Logo */}
        <Link
          href="/"
          title="Lar Fraterno de Cambinda"
          className=" flex items-center gap-2.5 shrink-0"
        >
          <Image
            alt="logo"
            width={36}
            height={36}
            src="/images/larFraternoIconBlack.png"
            className="rounded-md"
            priority
          />
          <span className="text-sm font-semibold text-[var(--black)] leading-tight ">
            Lar Fraterno
            <br />
            <span className="font-normal text-xs text-gray-500">
              de Cambinda
            </span>
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 w-full col-span-2">
          <Searchbar />
        </div>

        {/* Links */}
        <div className="flex items-center justify-end gap-4 shrink-0 row-start-1 row-end-2 col-start-2 col-end-3">
          <Link
            href="/reunioes"
            className="text-sm text-white bg-accent flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-colors"
          >
            <FilesIcon size={18} />
            Reuniões
          </Link>
        </div>
      </div>
    </nav>
  );
}
