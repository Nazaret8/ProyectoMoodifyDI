"use client";
import { useLanguage } from "@/app/context/LanguageContext ";
import Link from "next/link";

export default function NavBarFooterMoodify() {
  const { language } = useLanguage();

  return (
    <footer className="text-white py-4" style={{ backgroundColor: "#2F2F2F" }}>
      <div className="container d-flex justify-content-between align-items-center flex-column flex-sm-row">
        <p className="mb-0 text-center text-sm-start">
          Copyright © 2024/2025 Website.{" "}
          {language === "Spanish"
            ? "Todos los derechos reservados"
            : "All rights reserved"}
        </p>

        <nav className="mt-3 mt-sm-0">
          <ul className="d-flex list-unstyled mb-0 justify-content-center justify-content-sm-start">
            <li className="mx-3">
              <Link href="/support" className="text-white text-decoration-none">
                {language === "Spanish" ? "Soporte" : "Support"}
              </Link>
            </li>
            <li className="mx-3">
              <Link href="/FAQ" className="text-white text-decoration-none">
                {language === "Spanish" ? "FAQ" : "FAQ"}
              </Link>
            </li>
            <li className="mx-3">
              <Link href="/contact" className="text-white text-decoration-none">
                {language === "Spanish" ? "Contacto" : "Contact"}
              </Link>
            </li>
            <li className="mx-3">
              <Link
                href="/policy-and-privacy"
                className="text-white text-decoration-none"
              >
                {language === "Spanish"
                  ? "Política y privacidad"
                  : "Privacy & Policy"}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="d-flex justify-content-center justify-content-sm-end gap-3 mt-3 mt-sm-0">
          <a href="https://www.facebook.com/profile.php?id=61572616985114" target="_blank" rel="noreferrer">
            <img
              src="/icons/facebook.png"
              alt={language === "Spanish" ? "Facebook" : "Facebook"}
              width="20"
              height="20"
            />
          </a>
          <a href="https://x.com/moodifymusicapp" target="_blank" rel="noreferrer">
            <img
              src="/icons/twitter.png"
              alt={language === "Spanish" ? "Twitter" : "Twitter"}
              width="20"
              height="20"
            />
          </a>
          <a href="https://www.instagram.com/moodifymusicapp/" target="_blank" rel="noreferrer">
            <img
              src="/icons/instagram.png"
              alt={language === "Spanish" ? "Instagram" : "Instagram"}
              width="20"
              height="20"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
