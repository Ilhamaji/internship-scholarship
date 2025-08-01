import { Metadata } from "next";
import Navbar from "@/components/root/navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Web Monitoring TSU",
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
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
