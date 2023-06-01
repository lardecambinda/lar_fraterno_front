import Image from "next/image";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="py-2">
      <div className=" max-w-screen-lg m-auto max-lg:px-4 grid grid-cols-2 grid-rows-2  lg:flex lg:items-center lg:justify-between ">
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
              className="logo w-12 sm:w-16"
            />
            <p className="text-xs max-w-[100px] text-center font-semibold leading-none text-white">
              Lar Fraterno de Cambinda
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
