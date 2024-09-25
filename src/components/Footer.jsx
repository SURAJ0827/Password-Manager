import React from "react";

export const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center py-3 w-full">
      <div className="logo font-bold text-black text-2xl text-center">
        <span className="text-green-500"> &lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </div>
      <div className="flex gap-2">
        Created with
        <img className="w-5" src="icons/heart.png" alt="heart" /> by Suraj
      </div>
    </div>
  );
};
