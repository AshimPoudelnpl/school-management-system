import React from "react";

const Input = ({ type, placeholder,id,onChange,value }) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className="border-2 border-red-400 rounded-lg p-2 w-full focus:outline-none focus:border-0 focus:ring-2"
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
