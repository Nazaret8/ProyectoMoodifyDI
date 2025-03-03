"use client";
import { useLanguage } from "@/app/context/LanguageContext ";
import { useState, useEffect } from "react";
import UserLibrary from "./UserLibrary";

export default function MoodsDiary() {
  const [estado, setEstado] = useState("");
  const { language } = useLanguage();
  const [fechaActual, setFechaActual] = useState("");

  useEffect(() => {
    const hoy = new Date();
    const opciones = { year: "numeric", month: "long", day: "numeric" };
    setFechaActual(
      hoy.toLocaleDateString(
        language === "Spanish" ? "es-ES" : "en-US",
        opciones
      )
    );
  }, [language]);

  async function registrarEstado(e) {
    e.preventDefault();

    if (estado === "") {
      alert(
        language === "Spanish"
          ? "El estado es obligatorio"
          : "State is required"
      );
      return;
    }

    const response = await fetch("/api/diario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        estado: estado,
        fechaActualEstado: fechaActual,
      }),
    });

    if (response.ok) {
      setEstado("");
      alert(
        language === "Spanish"
          ? "Se ha registrado correctamente el estado"
          : "State has been successfully recorded"
      );

      window.location.href = "/journal";
    } else {
      alert(
        language === "Spanish"
          ? "Hubo un error al registrar el estado"
          : "There was an error recording the state"
      );
    }
  }

  return (
    <div
      className="container-fluid p-0"
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom left, #ffffff, #F4DCFF, #D781FF, #AE00FF)",
      }}
    >
      <div className="row no-gutters" style={{ height: "100%" }}>
        <div className="col-3 p-0" style={{ zIndex: 10 }}>
          <UserLibrary />
        </div>

        <div className="col-9 d-flex flex-column p-0">
          <div
            className="d-flex align-items-center px-3 titulo"
            style={{ height: "72px", color: "#2F2F2F" }}
          >
            <h2 className="m-0">
              {language === "Spanish" ? "Diario de Moods" : "Moods Diary"}
            </h2>
          </div>

          <h4
            className="text-start mt-4 text-center texto1 "
            style={{ color: "#2F2F2F" }}
          >
            {language === "Spanish"
              ? "Describe tu estado de ánimo"
              : "Describe your state of mind"}
          </h4>
          <p
            className="text-start text-center texto2"
            style={{ color: "#2F2F2F" }}
          >
            {language === "Spanish" ? "Hoy - " : "Today - "} {fechaActual}
          </p>

          <div
            className="d-flex justify-content-center align-items-center"
            style={{ flex: 1 }}
          >
            <div
              className="card p-4 shadow-lg"
              style={{
                backgroundColor: "#FFFFFF",
                maxWidth: "500px",
                width: "100%",
              }}
            >
              <form
                className="d-flex flex-column align-items-center"
                onSubmit={registrarEstado}
              >
                <textarea
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                  rows="4"
                  className="form-control mb-3"
                  placeholder={
                    language === "Spanish" ? "Escribe aquí..." : "Write here..."
                  }
                  style={{
                    resize: "none",
                    height: "200px",
                  }}
                />
                <button type="submit" className="btn w-100 btn-custom">
                  {language === "Spanish"
                    ? "Ir a mi calendario"
                    : "Go to my journal"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`@media (max-width: 768px) {
        .card {
          margin-left: 1% !important;
          transform: translateX(-10%);
          margin-top: -90px; 
        }
        .titulo{
            margin-left:2% !important;
            margin-top: 9px 
        
        }
        .texto1{
          margin-left:-18% !important;
        
        }

        .texto2{
          margin-left:-18% !important;
        }
      `}
      </style>
    </div>
  );
}
