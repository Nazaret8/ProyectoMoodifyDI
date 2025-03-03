"use client";
import { useLanguage } from "@/app/context/LanguageContext ";

export default function NavBarFooter() {
  const { language } = useLanguage();

  return (
    <footer className="text-white text-center py-4" style={{ backgroundColor: "#2F2F2F" }}>
      <div className="container-fluid">
        <p className="mb-2">
          Copyright © 2024/2025 Website.{" "}
          {language === "Spanish" ? "Todos los derechos reservados" : "All rights reserved"}
        </p>
        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=61572616985114"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/icons/facebook.png"
              alt="Facebook"
              width="30"
              height="30"
            />
          </a>
          <a
            href="https://x.com/moodifymusicapp"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/icons/twitter.png"
              alt="Twitter"
              width="30"
              height="30"
            />
          </a>
          <a
            href="https://www.instagram.com/moodifymusicapp/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/icons/instagram.png"
              alt="Instagram"
              width="30"
              height="30"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
