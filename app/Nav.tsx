import Image from "next/image";
import Link from "next/link";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";

export default function Nav() {
  return (
    <nav className="w-full py-4">
      <div className="max-w-screen-lg m-auto max-lg:px-4 flex items-center justify-between">
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
              className="logo w-16"
            />
            <p className="text-xs max-w-[100px] text-center font-semibold leading-none">
              Lar Fraterno de Cambinda
            </p>
          </div>
        </Link>

        <div className="flex items-center justify-between">
          <a
            className="text-sm hover:underline flex items-center gap-1"
            href="mailto:lardecambinda@gmail.com"
          >
            <AiOutlineMail className="text-xl" />
            lardecambinda@gmail.com
          </a>

          <Link
            className="text-sm hover:underline flex items-center gap-1 ml-2 border-l border-light-black pl-2"
            href={"/admin"}
          >
            <AiOutlineUser className="text-xl" />
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
