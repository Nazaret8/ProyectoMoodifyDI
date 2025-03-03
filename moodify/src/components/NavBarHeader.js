"use client";
import { useLanguage } from "@/app/context/LanguageContext ";
import Link from "next/link";
import "@/app/styles/global.css";

export default function NavBarHeader() {
  const { language } = useLanguage();

  return (
    <header
      className="text-white text-center p-3"
      style={{ backgroundColor: "#2F2F2F" }}
    >
      <nav className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-2 mb-md-0">
          <img
            src="/LogoMoodify.png"
            alt="Logo Moodify"
            className="img-fluid"
            style={{ maxWidth: "70px", height: "auto" }}
          />
        </div>
        <div className="d-flex justify-content-center justify-content-md-end w-100">
          <Link
            href="/login"
            className="btn custom-btn mx-2 text-center"
            style={{
              backgroundColor: "#443B5C",
              color: "white",
            }}
          >
            {language === "Spanish" ? "Iniciar Sesión" : "Log In"}
          </Link>
          <Link
            href="/signup"
            className="btn custom-btn mx-2 text-center"
            style={{ backgroundColor: "#443B5C", color: "white" }}
          >
            {language === "Spanish" ? "Registrarse" : "Sign Up"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
