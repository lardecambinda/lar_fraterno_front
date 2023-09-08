import { Loader } from "lucide-react";
import React from "react";

interface IProps {
  loading: boolean;
  label: string;
  onClick?: (e: any) => void;
  className?: string;
  width?: string | number;
}

const SubmitButton = ({
  loading,
  label,
  onClick,
  className,
  width,
}: IProps) => {
  return (
    <button
      type="submit"
      style={{ width: width && width }}
      onClick={onClick && onClick}
      title={loading ? "Carregando..." : label}
      className={`bg-light-black text-white font-semibold h-11 flex items-center justify-center rounded ${
        className && className
      } ${!width ? "w-full" : null}`}
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
