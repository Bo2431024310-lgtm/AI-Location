import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Makro AI Item Location",
  description: "ค้นหาสินค้าและตำแหน่งชั้นวางใน Makro ได้อย่างรวดเร็ว",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}

