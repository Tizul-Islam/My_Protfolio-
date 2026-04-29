import type { Metadata } from "next";
import { Poppins, Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K.M Tizul Islam | Full Stack Developer",
  description:
    "Portfolio of K.M Tizul Islam — Computer Science graduate, React & Node.js developer. B.Sc. CSE, Green University of Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${firaCode.variable} dark`}>
      <body className="font-poppins bg-background text-foreground antialiased selection:bg-accent/30 selection:text-accent">
        {children}
      </body>
    </html>
  );
}
