"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";

export default function page() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(setError, identifier, password);

      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="invisible hidden lg:visible lg:flex w-full bg-gradient-to-t from-[#09697E] to-white"></div>
      <div className="flex w-full h-full">
        <div className="flex flex-col m-auto gap-10 p-8 md:p-0 w-full">
          <div className="w-50 m-auto">
            <img src="/icon/logo.svg" className="" alt="" />
          </div>
          {error !== "" ? <div className="mx-auto">{error}</div> : ""}
          <div className="flex p-4 m-auto md:p-8 border rounded-lg w-full md:w-96 lg:w-[30vw]">
            <form onSubmit={(e) => handleLogin(e)} className="w-full block">
              <div className="">
                <label htmlFor="identifier" className="font-bold">
                  NIM
                </label>
                <input
                  type="text"
                  name="identifier"
                  id="identifier"
                  placeholder="Masukkan NIM anda"
                  className="px-4 py-2 border w-full"
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6">
                <label htmlFor="password" className="font-bold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Masukkan password anda"
                  className="px-4 py-2 border w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-self-end">
                <a href="" className="text-sm font-bold">
                  Lupa password ?
                </a>
              </div>
              <br />
              <button
                type="submit"
                className="w-full bg-[#1D7D94] text-white py-2 rounded-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
