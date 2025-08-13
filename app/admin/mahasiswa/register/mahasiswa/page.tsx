"use client";

import api from "@/lib/axios";
import React, { useState } from "react";

export default function Page() {
  const [nim, setNim] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("student"); // default langsung student
  const [kelas, setKelas] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState(""); // pakai nama field sesuai backend
  const [jenis_beasiswa, setJnsBea] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        nim,
        name,
        role, // akan selalu "student"
        kelas,
        jenis_kelamin, // sesuai backend
        jenis_beasiswa,
        password,
      };

      console.log("Data dikirim:", data);

      const response = await api.post(`/auth/register/mahasiswa`, data);

      console.log(response.data);
    } catch (error: any) {
      console.log(error);
      return setError(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Register Mahasiswa</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        {/* NIM */}
        <div>
          <label className="block mb-1">NIM</label>
          <input
            type="number"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Nama Lengkap Mahasiswa */}
        <div>
          <label className="block mb-1">Nama Lengkap Mahasiswa</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <img
                src={showPassword ? "/icon/eye_hide.svg" : "/icon/eye_show.svg"}
                alt="Toggle password"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Role (Read Only) */}
        <div>
          <label className="block mb-1">Role</label>
          <input
            type="text"
            value={role}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Kelas */}
        <div>
          <label className="block mb-1">Kelas</label>
          <input
            type="text"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block mb-1">Jenis Kelamin</label>
          <select
            value={jenis_kelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* Jenis Beasiswa */}
        <div>
          <label className="block mb-1">Jenis Beasiswa</label>
          <input
            type="text"
            value={jenis_beasiswa}
            onChange={(e) => setJnsBea(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Tombol */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Daftar
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
