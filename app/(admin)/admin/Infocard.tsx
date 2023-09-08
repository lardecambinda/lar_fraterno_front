import { Loader } from "lucide-react";

type Props = {
  title: string;
  number?: number;
  Icon: JSX.Element;
};
export default function Infocard({ title, number, Icon }: Props) {
  return (
    <div className="p-4 rounded-md shadow-md bg-white flex-1">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="text-xl p-2 rounded-full flex items-center justify-center bg-violet">
            {Icon}
          </div>
          <p className="text-xl font-semibold ">{title}</p>
        </div>

        <p className="text-3xl font-bold ml-4">
          {number ? (
            number
          ) : number == 0 ? (
            number
          ) : (
            <span className="block py-1 w-fit animate-spin">
              <Loader size={26} strokeWidth={1.5} />
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
