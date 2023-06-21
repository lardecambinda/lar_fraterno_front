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
        <p className="text-3xl font-bold ml-4">{number ? number : 0}</p>
      </div>
    </div>
  );
}
