import React from "react";

interface IProps {
  width: number;
  height: number;
}

const Skeleton = ({ width, height }: IProps) => {
  return (
    <div
      style={{ width: width, height: height }}
      className="bg-gray-400 animate-pulse"
    ></div>
  );
};

export default Skeleton;
