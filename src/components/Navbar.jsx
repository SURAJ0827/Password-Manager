import React from "react";

export const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div
        className="mycontainer flex justify-between items-center 
      px-4 py-5 h-14"
      >
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="/About">
              About
            </a>
            <a className="hover:font-bold" href="/Contact">
              Contact
            </a>
          </li>
        </ul> */}
        <a href="https://github.com/SURAJ0827">
          <button className="bg-green-500 flex rounded-full px-2 py-1 items-center gap-2">
            <img
              className="invert w-7 rounded-full"
              src="icons/github.jpg"
              alt="github"
            />
            <span className="font-bold">GitHub</span>
          </button>
        </a>
      </div>
    </nav>
  );
};
