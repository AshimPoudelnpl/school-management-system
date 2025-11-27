import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className=" flex justify-center items-center py-6">
      <FaSpinner className=" text-blue-600" size={40} />
    </div>
  );
};

export default Loading;
