"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext ";
import { MusicProvider } from "./context/MusicContext";
import MusicPlayer from "@/components/MusicPlayer";
import "bootstrap/dist/css/bootstrap.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const ocultarReproductor = ["/", "/login", "/signup"].includes(pathname);

  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        <LanguageProvider>
          <MusicProvider>
            <main className="flex-grow-1" style={{ marginBottom: ocultarReproductor ? "0" : "80px" }}>
              {children}
            </main>
            {!ocultarReproductor && (
              <div className="position-fixed bottom-0 w-100 bg-dark" style={{ height: "80px", zIndex: 1050 }}>
                <MusicPlayer />
              </div>
            )}
          </MusicProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
