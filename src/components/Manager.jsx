import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

export const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);
  useEffect(() => {});

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyeCross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyeCross.png";
    }
  };

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      // Check if we are updating an existing password
      if (form.id) {
        // Delete the existing password using its id
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      // Now, add the new/updated password with a new id
      const newPassword = { ...form, id: uuidv4() };

      // Add the new password to the state
      setPasswordArray([...passwordArray, newPassword]);

      // Save the new password in the backend
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });

      // Clear the form after saving
      setform({ site: "", username: "", password: "", id: "" });
    } else {
      // Show error if form validation fails
      toast("Error: Password Not Saved !!");
    }
  };

  const deletePassword = async (id) => {
    console.log("dlt pass of id", id);
    let c = confirm("Do You Really Want to Delete this Password ??");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
  };

  const editPassword = (id) => {
    console.log("edit pass of id", id);
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    // console.log(...passwordArray, form);
  };
  const copyText = (text) => {
    toast("Copied to Clipboard!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 md:p-0 md:mycontainer m-2 min-h-[88vh]">
        <h1 className="text-4xl text">
          <div className="logo font-bold text-black text-2xl text-center">
            <span className="text-green-500"> &lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </div>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-5 items-center m-2">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter your Website URL"
            type="text"
            id="site"
            className="rounded-full border border-green-700 w-full py-1 p-4"
            required
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
              type="text"
              id="username"
              className="rounded-full border border-green-700 p-4 py-1 w-full"
              required
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Enter Password"
                id="password"
                className="rounded-full border border-green-700 p-4 py-1 w-full"
                required
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p1"
                  width={20}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center
           bg-green-500 hover:bg-green-400 rounded-full px-2 gap-2
           py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 py-2 border border-white">
                        {" "}
                        <div className="flex items-center justify-center">
                          <a
                            className="flex items-center justify-center"
                            href={item.site}
                            target="_blank"
                          >
                            {item.site}
                          </a>
                          <img
                            className="w-5 justify-end cursor-pointer ml-3  hover:bg-slate-300"
                            onClick={() => {
                              copyText(item.site);
                            }}
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex items-center space-x-4 justify-center">
                          <span>{item.username}</span>
                          <img
                            className="w-5 cursor-pointer hover:bg-slate-300"
                            onClick={() => {
                              copyText(item.username);
                            }}
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>

                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex items-center space-x-4 justify-center">
                          <span>{item.password}</span>
                          <img
                            className="w-5 cursor-pointer  hover:bg-slate-300"
                            onClick={() => {
                              copyText(item.password);
                            }}
                            src="icons/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            colors="primary:#000000,secondary:#30e8bd"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            colors="primary:#000000,secondary:#30e8bd"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
