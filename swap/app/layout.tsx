import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <div className="z-20">{children}</div>
        {/* <div className="z-10 absolute inset-0 bg-repeat bg-[url('https://app.uniswap.org/images/noise-color.png')] bg-center bg-[length:200px_200px]  opacity-[0.015]" /> */}
      </body>
    </html>
  );
}
