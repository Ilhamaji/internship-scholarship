import React from "react";
import SidebarAdmin from "@/components/admin/root/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar di kiri */}
      <SidebarAdmin />

      {/* Konten utama di kanan */}
      <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">{children}</main>
    </div>
  );
}
