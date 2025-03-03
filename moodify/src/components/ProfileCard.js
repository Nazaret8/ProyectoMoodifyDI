"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";
import Link from "next/link";

export default function Profile() {
  const { language, changeLanguage } = useLanguage();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/usuarios/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("userInfo");
        setUser(null);
        window.location.href = "/";
      } else {
        console.error(
          language === "Spanish"
            ? "Error al cerrar sesión:"
            : "Error during logout:",
          data.error || "Desconocido"
        );
      }
    } catch (error) {
      console.error(
        language === "Spanish"
          ? "Error durante el logout:"
          : "Error during logout:",
        error
      );
    }
  };

  if (loading) {
    return <p>{language === "Spanish" ? "Cargando..." : "Loading..."}</p>;
  }

  if (error) {
    return (
      <p>{language === "Spanish" ? `Error: ${error}` : `Error: ${error}`}</p>
    );
  }

  if (!user) {
    return (
      <p>
        {language === "Spanish"
          ? "No estás autenticado"
          : "You are not authenticated"}
      </p>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(to bottom left, #FFFFFF, #F4DCFF, #D781FF, #AE00FF)",
        height: "100vh",
      }}
    >
      <div
        className="card p-4"
        style={{
          backgroundColor: "#1B1B1B",
          width: "400px",
          borderRadius: "8px",
        }}
      >
        <h1 className="text-white text-center">
          {language === "Spanish" ? "Perfil de Usuario" : "User Profile"}
        </h1>

        <div
          className="p-3 mb-3"
          style={{
            backgroundColor: "#4A4A4A",
            borderRadius: "8px",
          }}
        >
          <p className="text-white">
            {language === "Spanish" ? "Email:" : "Email:"} {user.email}
          </p>
          <p className="text-white">
            {language === "Spanish" ? "Nombre de Usuario:" : "Username:"}{" "}
            {user.nombreUsuario}
          </p>
        </div>

        <button
          onClick={() =>
            changeLanguage(language === "Spanish" ? "English" : "Spanish")
          }
          className="btn-profile"
        >
          {language === "Spanish" ? "Inglés" : "Español"}
        </button>

        <Link href="/journal">
          <button className="btn-profile">
            {language === "Spanish" ? "Diario de Emociones" : "Emotion Journal"}
          </button>
        </Link>

        <button onClick={handleLogout} className="btn-profile">
          {language === "Spanish" ? "Cerrar Sesión" : "Log Out"}
        </button>
      </div>
    </div>
  );
}
