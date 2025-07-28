import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Web Monitoring TSU",
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
  return <>{children}</>;
}
