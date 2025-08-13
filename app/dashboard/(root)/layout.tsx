import { Metadata } from "next";
import MonevProvider from "@/components/dashboard/mahasiswa/root/provider/monevProvider";

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
      <MonevProvider>{children}</MonevProvider>
    </div>
  );
}
