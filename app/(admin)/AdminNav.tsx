import Image from "next/image";
import Link from "next/link";

export default function AdminNav() {
  return (
    <div className="bg-light-black  p-4 fixed w-full bottom-0 md:h-full md:w-auto">
      <div>
        <div>
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

        <div>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
