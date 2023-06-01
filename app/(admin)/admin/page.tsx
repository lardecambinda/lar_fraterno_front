import Infocard from "./Infocard";
import { AiOutlineFileText } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";

export default function page() {
  return (
    <div className="">
      <div className="flex items-center gap-4 mt-4">
        <Infocard title="Publicações" number={0} Icon={<AiOutlineFileText />} />
        <Infocard title="Usuários" number={0} Icon={<FiUsers />} />
        <Infocard title="Categorias" number={0} Icon={<MdOutlineCategory />} />
      </div>
    </div>
  );
}
