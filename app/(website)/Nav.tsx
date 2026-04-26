import Image from "next/image";
import Link from "next/link";
import Searchbar from "./Searchbar";
import { Mail, User } from "lucide-react";

export default function Nav() {
  return (
    <nav className="w-full py-4">
      <div className=" max-w-screen-lg m-auto max-lg:px-4 grid grid-cols-2 grid-rows-2  lg:flex lg:items-center lg:justify-between ">
        <Link
          className=" block w-fit"
          title="lar fraterno de cambinda"
          href={"/"}
        >
          <div className="w-fit flex flex-col items-center justify-center">
            <Image
              alt="logo"
              width={200}
              height={200}
              src={"/images/larFraternoIconBlack.png"}
              className="logo w-12 sm:w-16"
              priority
            />
            <p className="text-xs max-w-[100px] text-center font-semibold leading-none">
              Lar Fraterno de Cambinda
            </p>
          </div>
        </Link>

        <div className="order-last lg:order-none col-span-full lg:flex-1 flex items-center justify-center h-fit mt-4">
          <Searchbar />
        </div>

        <div className="flex-col items-end sm:flex-row flex sm:items-center lg:justify-between justify-end">
          <a
            className="text-xs sm:text-sm hover:underline flex items-center gap-1 w-fit"
            href="mailto:lardecambinda@gmail.com"
          >
            <Mail size={16} strokeWidth={1.5} />
            lardecambinda@gmail.com
          </a>

          <Link
            className="text-xs sm:text-sm hover:underline flex items-center gap-1 ml-2 sm:border-l sm:border-light-black pl-2"
            href={"/feed"}
          >
            Feed
          </Link>

          <Link
            className="text-xs sm:text-sm hover:underline flex items-center gap-1 ml-2 sm:border-l sm:border-light-black pl-2"
            href={"/perfil"}
          >
            <User size={16} strokeWidth={1.5} />
            Perfil
          </Link>

          <Link
            className="text-xs sm:text-sm hover:underline flex items-center gap-1 ml-2 sm:border-l sm:border-light-black pl-2"
            href={"/admin"}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
