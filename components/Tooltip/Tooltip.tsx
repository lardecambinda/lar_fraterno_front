import "./Tooltip.css";
import React from "react";

interface IProps {
  children: JSX.Element | JSX.Element[];
  text: string;
}

const Tooltip = ({ children, text }: IProps) => {
  return (
    <div className="element ">
      {children}

      <div className="tooltip bg-white shadow p-2 text-xs font-semibold rounded text-gray-500 w-[120px]">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
