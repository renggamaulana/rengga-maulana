import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "../components/ThemeProvider";
import { Playfair_Display, Inter, League_Spartan, Fredericka_the_Great } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] });
const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

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
        className={`antialiased ${inter.className} `}
      >
       {/* Wrap the content in the client-side ThemeProvider */}
       <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
