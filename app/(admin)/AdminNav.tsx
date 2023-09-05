import Image from "next/image";
import Link from "next/link";
import { FilePlus2, Home, Users } from "lucide-react";

export default function AdminNav() {
  return (
    <div className="bg-light-black fixed w-full bottom-0 h-20 md:h-full md:w-auto">
      <div className="flex md:flex-col items-start justify-center w-full h-full">
        <div className="p-4">
          <Link
            className="block w-fit"
            title="lar fraterno de cambinda"
            href={"/"}
          >
            <div className="w-fit flex flex-col items-center justify-center">
              <Image
                alt="logo"
                width={200}
                height={200}
                src={"/images/larFraternoIconBlack.png"}
                className="logo w-9 md:w-12 sm:w-16 "
                priority
              />
              <p className="text-[10px] md:text-xs max-w-[100px] text-center font-semibold leading-none text-white">
                Lar Fraterno de Cambinda
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center w-full h-full">
          <ul className="text-white w-full h-full md:h-auto flex items-center justify-center md:block">
            <li className="h-full md:h-auto">
              <a
                title="Home"
                className="h-full hover:bg-white hover:bg-opacity-5 flex items-center justify-center px-4 md:px-0 md:py-4"
                href="/admin"
              >
                <Home strokeWidth={1.5} />
              </a>
            </li>
            <li className="h-full md:h-auto">
              <a
                title="Novo Post"
                className="h-full hover:bg-white hover:bg-opacity-5 flex items-center justify-center px-4 md:px-0 md:py-4"
                href="/admin/add-new-post"
              >
                <FilePlus2 strokeWidth={1.5} />
              </a>
            </li>
            <li className="h-full md:h-auto">
              <a
                title="Usuários"
                className="h-full hover:bg-white hover:bg-opacity-5 flex items-center justify-center px-4 md:px-0 md:py-4"
                href="/admin/users"
              >
                <Users strokeWidth={1.5} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
