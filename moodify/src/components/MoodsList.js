"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";
import UserLibrary from "./UserLibrary";

export default function MoodsList() {
  const [moods, setMoods] = useState([]);
  const [error, setError] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch("/api/moods");
        const data = await response.json();
        if (response.ok) {
          console.log("Moods recibidos:", data.moods);
          setMoods(data.moods);
        } else {
          setError(data.error || "Error al cargar los moods");
        }
      } catch (err) {
        setError("Error de conexión con el servidor");
        console.error(err);
      }
    };

    fetchMoods();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div
      className="container-fluid p-0"
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom left, #ffffff, #F4DCFF, #D781FF, #AE00FF)",
        position: "relative",
      }}
    >
      <div className="row no-gutters" style={{ height: "100%", width: "100%" }}>
        <div className="col-3 p-0" style={{ position: "relative", zIndex: 10 }}>
          <UserLibrary />
        </div>

        <div
          className="col-12 col-md-9 d-flex flex-column align-items-center p-0 moods-container"
          style={{
            height: "100%",
            position: "absolute",
            top: 0,
            left: "18px",
            width: "100%",
            zIndex: 1,
          }}
        >
          <h2
            className="text-start"
            style={{
              color: "#2F2F2F",
              width: "100%",
              paddingLeft: "1rem",
              marginTop: "9px",
              padding: "11px",
              marginLeft: "-50px",
            }}
          >
            {language === "Spanish" ? "Lista de Moods" : "Mood List"}
          </h2>

          <section
            className="d-flex flex-wrap justify-content-center moods-grid"
            style={{
              gap: "1rem",
              width: "90%",
              maxWidth: "800px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gridTemplateRows: "repeat(auto-fit, minmax(150px, auto))",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {moods.map((mood) => (
              <div
                key={mood.id}
                className="text-center d-flex flex-column align-items-center"
                style={{
                  width: "150px",
                }}
              >
                <img
                  src={mood.imagen}
                  alt={
                    language === "Spanish" ? mood.descripcion : mood.description
                  }
                  className="rounded-3 img-fluid"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h4
                  style={{
                    marginTop: "6px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#2F2F2F",
                    textAlign: "center",
                    display: "block",
                    maxWidth: "150px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {language === "Spanish" ? mood.descripcion : mood.description}
                </h4>
              </div>
            ))}
          </section>
        </div>
      </div>
      <style>
        {`
      @media (min-width: 1024px) {
        .moods-container {
          left: 25% !important;
          width: 75% !important;
        }
  
        .moods-container h2 {
          padding-left: 4.5rem !important;
        }
  
        .moods-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          grid-template-rows: repeat(2, auto) !important;
          gap: 2rem !important;
          justify-content: center !important; 
          align-items: center !important;
          max-width: 900px !important;
        }
      }
      @media (max-width: 1024px) {
        .moods-container h2 {
          text-align: center !important;
          padding-left: 0 !important;
          margin-top: 1rem !important;
        }
       .moods-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important; /* Fijar dos columnas */
          gap: 1rem !important;
          justify-content: center !important;
          align-items: center !important;
        }
        .titulo {
          margin-top: 10px;
        }
      }
    `}
      </style>
    </div>
  );
}
