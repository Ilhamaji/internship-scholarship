"use client";

import React, { useState } from "react";
import { Image } from "@heroui/image";
import { Avatar } from "@heroui/avatar";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function App() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Daftar Mahasiswa", href: "/admin/mahasiswa" },
    { label: "Laporan Monev", href: "/admin/laporan_monev" },
  ];

  return (
    <div className="flex sticky top-0 h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-[#09697E] text-white flex flex-col px-4 py-6 fixed md:static top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Admin Info */}
        <div className="flex flex-col items-center mb-8">
          <Avatar src={Cookies.get("avatar")} size="lg" className="mb-2" />
          <span className="text-sm font-semibold">Nama Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`block w-full px-4 py-2 rounded-md hover:bg-[#075261] ${
                pathname === item.href ? "bg-[#075261]" : ""
              }`}
              onClick={() => setSidebarOpen(false)} // otomatis tutup sidebar setelah klik
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={() => {
              setSidebarOpen(false);
              router.push("/logout");
            }}
            className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 mt-6 text-white"
          >
            Keluar
          </button>
        </div>
      </aside>

      {/* Overlay saat sidebar dibuka di mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Content Area */}
      <main>
        {/* Toggle Button (only mobile) */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden mb-4 text-gray-800"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </main>
    </div>
  );
}
