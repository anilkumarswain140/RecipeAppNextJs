"use client"
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider";
import Header from "./components/Header/Header";
import { usePathname } from 'next/navigation'
import Footer from "./components/Footer/Footer";
import { ToastProvider } from './contexts/ToastContext';

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



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const location = usePathname();
  console.log(location)
  const hideHeaderFooter = location === '/signup' || location === '/login';
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="main-container">
            {!hideHeaderFooter && <Header />}
            <div className="content">
              <ToastProvider>
                {children}
              </ToastProvider>
            </div>
            {!hideHeaderFooter && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  );
}
