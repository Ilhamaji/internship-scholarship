"use client";
import React from "react";

export default function formLogin({
  handleSubmit,
  setIdentifier,
  setPassword,
}: {
  handleSubmit: any;
  setIdentifier: any;
  setPassword: any;
}) {
  return (
    <form onSubmit={handleSubmit} className="w-full block">
      <div className="">
        <label htmlFor="nim" className="font-bold">
          NIM
        </label>
        <input
          onChange={(e) => setIdentifier(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
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
  );
}
