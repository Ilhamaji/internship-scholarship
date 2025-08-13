"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/lib/auth";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";

export default function page() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
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
    <div className="flex w-full h-screen bg-neutral-100">
      <div className="flex flex-row w-full mx-20 py-20 rounded-lg">
        <div className="invisible hidden lg:visible lg:flex w-full bg-gradient-to-t from-[#09697E] to-white rounded-l-lg"></div>
        <div className="flex w-full h-full bg-white rounded-lg lg:rounded-l-none lg:rounded-r-lg">
          <div className="flex flex-col m-auto gap-10 p-8 md:p-0 w-full ">
            <div className="w-50 m-auto">
              <img src="/icon/logo.svg" className="" alt="" />
            </div>
            {error !== "" ? <div className="mx-auto">{error}</div> : ""}
            <div className="flex p-4 m-auto md:p-8 rounded-lg w-full md:w-96 lg:w-[30vw]">
              <form
                onSubmit={(e) => handleLogin(e)}
                className="flex flex-col gap-4 w-full"
              >
                <Input
                  label="NIM"
                  labelPlacement="outside"
                  type="nim"
                  name="nim"
                  id="nim"
                  errorMessage="Masukkan nim dengan benar!"
                  placeholder="Masukkan nim anda"
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  labelPlacement="outside"
                  type={isPasswordShown ? "text" : "password"}
                  name="password"
                  id="password"
                  errorMessage="Masukkan password dengan benar!"
                  placeholder="Masukkan password anda"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Checkbox
                  size="sm"
                  onChange={(e) => setIsPasswordShown(e.target.checked)}
                >
                  Tampilkan
                </Checkbox>
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
    </div>
  );
}
