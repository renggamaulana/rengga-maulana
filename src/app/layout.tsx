import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Playfair_Display, DM_Sans, Halant ,Capriola, Advent_Pro, Roboto, Inter } from 'next/font/google'
import { usePathname } from "next/navigation";
import Navbar from '../components/Navbar';
import ThemeUpdater from "@/components/ThemeUpdater";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'],   weight: ['400', '700'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'] });
const capriola = Capriola({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-capriola",
});
const adventPro = Advent_Pro({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-advent-pro",
});

export const metadata: Metadata = {
  title: "Rengga Maulana",
  description: "Generated by create next app",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`antialiased ${inter.className} ${capriola.variable} ${adventPro.variable} `}
      >
       {/* Wrap the content in the client-side ThemeProvider */}
       <ThemeProvider>
          <ThemeUpdater/>
          <Navbar/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
