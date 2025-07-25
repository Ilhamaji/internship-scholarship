import { Metadata } from "next";
import Navbar from "@/components/dashboard/navbar";
import { UserProvider } from "@/contexts/userData";

export const metadata: Metadata = {
  title: "Dashboard | Web Monitoring TSU",
  description:
    "Website ini adalah website monitoring untuk mahasiswa yang menerima beasiswa di Tiga Serangkai University.",
  icons: {
    icon: "/icon/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <UserProvider>{children}</UserProvider>
    </div>
  );
}
