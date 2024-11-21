import type { Metadata } from "next";
import localFont from "next/font/local";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import Header from "./components/header/Header";
import FooterPage from "./components/Footer";
import dynamic from "next/dynamic";
const ToastContainer = dynamic(() => import('react-toastify').then(mod => mod.ToastContainer), { ssr: false });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cloud Hosting",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        <ToastContainer/> {/*to be available through all pages*/}
        <main className="fix-height">
        {children}  
        {/* childern here is the placehoder for routing */}
        </main>
        <FooterPage/>
        
      </body>
    </html>
  );
}