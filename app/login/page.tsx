"use client";

export default function page() {
  return (
    <div className="flex flex-row h-screen">
      <div className="invisible hidden lg:visible lg:flex w-full bg-gradient-to-t from-[#09697E] to-white"></div>
      <div className="flex w-full h-full">
        <div className="flex flex-col m-auto gap-10 p-8 md:p-0 w-full">
          <div className="w-50 m-auto">
            <img src="/icon/logo.svg" className="" alt="" />
          </div>
          <div className="flex p-4 m-auto md:p-8 border rounded-lg w-full md:w-96 lg:w-[30vw]">
            <form action="" className="w-full block">
              <div className="">
                <label htmlFor="nim" className="font-bold">
                  NIM
                </label>
                <input
                  type="text"
                  name="nim"
                  id="nim"
                  placeholder="Masukkan NIM anda"
                  className="px-4 py-2 border w-full"
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
