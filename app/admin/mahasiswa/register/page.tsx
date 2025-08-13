"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";
import { Input } from "@heroui/input";

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
      <div className="flex flex-col m-auto gap-10 p-8 md:p-0 w-full">
        <div className="w-50 m-auto">
          <img src="/icon/logo.svg" className="" alt="" />
        </div>
        {error !== "" ? <div className="mx-auto">{error}</div> : ""}
        <div className="flex p-4 m-auto md:p-8 border rounded-lg w-full md:w-96 lg:w-[30vw]">
          <form
            onSubmit={(e) => handleLogin(e)}
            className="flex flex-col gap-4 w-full"
          >
            <Input
              type="text"
              name="identifier"
              id="identifier"
              labelPlacement="outside"
              label="NIM"
              placeholder="Masukkan NIM anda"
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <Input
              type="password"
              name="password"
              labelPlacement="outside"
              id="password"
              label="Password"
              placeholder="Masukkan password anda"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button
              type="submit"
              className="w-full bg-[#1D7D94] text-white py-2 rounded-lg"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
