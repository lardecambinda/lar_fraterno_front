import React from "react";

interface IProps {
  width?: number;
  height: number;
  className?: string;
}

const Skeleton = ({ width, height, className }: IProps) => {
  return (
    <div
      className={`bg-gray-100 rounded-sm animate-pulse ${
        className && className
      }`}
      style={{ width: width ? width : "100%", height: height }}
    ></div>
  );
};

export default Skeleton;
