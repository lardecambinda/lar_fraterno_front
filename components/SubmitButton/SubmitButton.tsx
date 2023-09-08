import { Loader } from "lucide-react";
import React from "react";

interface IProps {
  loading: boolean;
  label: string;
  onClick?: (e: any) => void;
  className?: string;
}

const SubmitButton = ({ loading, label, onClick, className }: IProps) => {
  return (
    <button
      onClick={onClick && onClick}
      title={loading ? "Carregando..." : label}
      className={`bg-light-black text-white font-semibold  w-full h-11 flex items-center justify-center rounded ${
        className && className
      }`}
      disabled={loading ? true : false}
    >
      {loading ? (
        <div className="animate-spin">
          <Loader size={24} strokeWidth={1.5} />
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default SubmitButton;
