"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";
import UserLibrary from "./UserLibrary";

const WEATHER_API_KEY = "0220a7815a4b4bc58d5144735250702";
const WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json";

const getMoodBasedOnWeather = (weather, isDayTime, temperature, windSpeed) => {
  if (weather === "Sunny" && isDayTime) {
    return "Alegre";
  } else if (weather === "Rainy") {
    return "Tristeza";
  } else if (weather === "Cloudy") {
    return "Melancólico";
  } else if (!isDayTime) {
    return "Fiesta";
  } else if (isDayTime && windSpeed > 10 && windSpeed < 20) {
    return "Energético";
  }
  return "Alegre";
};

const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${latitude},${longitude}`
    );
    const data = await response.json();
    const condition = data.current.condition.text;
    const isDayTime = data.current.is_day === 1;
    const temperature = data.current.temp_c;
    const windSpeed = data.current.wind_kph;
    return { condition, isDayTime, temperature, windSpeed };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      condition: "Sunny",
      isDayTime: true,
      temperature: 22,
      windSpeed: 15,
    };
  }
};

export default function MoodsDetector() {
  const [loading, setLoading] = useState(false);
  const [moodSaved, setMoodSaved] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const { language } = useLanguage();
  const [userLocation, setUserLocation] = useState(null);

  const moodTranslations = {
    Alegre: { Spanish: "Alegre", English: "Happy" },
    Enamorado: { Spanish: "Enamorado", English: "In Love" },
    Energético: { Spanish: "Energético", English: "Energetic" },
    Fiesta: { Spanish: "Fiesta", English: "Party" },
    Melancólico: { Spanish: "Melancólico", English: "Melancholic" },
    Tristeza: { Spanish: "Tristeza", English: "Sadness" },
  };

  const moods = [
    { name: "Alegre", image: "alegre.png" },
    { name: "Enamorado", image: "enamorado.png" },
    { name: "Energético", image: "energico.png" },
    { name: "Fiesta", image: "fiesta.png" },
    { name: "Melancólico", image: "melancolico.png" },
    { name: "Tristeza", image: "triste.png" },
  ];

  useEffect(() => {
    const storedUserId = localStorage.getItem("userInfo");
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    } else {
      alert("Usuario no identificado.");
    }
  }, []);

  useEffect(() => {
    if (isAutomatic) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });
        });
      } else {
        alert("Geolocalización no disponible.");
      }
    }
  }, [isAutomatic]);

  useEffect(() => {
    if (userLocation && isAutomatic) {
      const detectMoodAutomatically = async () => {
        const { condition, isDayTime, temperature, windSpeed } =
          await getWeatherData(userLocation.latitude, userLocation.longitude);
        const mood = getMoodBasedOnWeather(
          condition,
          isDayTime,
          temperature,
          windSpeed
        );
        saveMood(mood);
      };
      detectMoodAutomatically();
    }
  }, [userLocation, isAutomatic]);

  const saveMood = async (mood) => {
    if (!userId) {
      alert("Usuario no identificado o ID de usuario inválido.");
      return;
    }

    setLoading(true);
    setMoodSaved(false);

    try {
      const response = await fetch("/api/detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId.id, mood }),
      });

      if (response.ok) {
        setMoodSaved(true);
      } else {
        alert("Error al guardar el estado de ánimo.");
      }
    } catch (error) {
      alert("Error en la solicitud.");
    }

    setLoading(false);
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom left, #FFFFFF, #F4DCFF, #D781FF, #AE00FF)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="row no-gutters" style={{ height: "100%", width: "100%" }}>
        <div className="col-3 p-0" style={{ height: "100%", zIndex: "6" }}>
          <UserLibrary />
        </div>

        <div
          className="col-9 d-flex flex-column p-0 "
          style={{ height: "100%", color: "#2F2F2F" }}
        >
          <div className="d-flex flex-column p-3 titulo-descripcion">
            <h2>
              {language === "Spanish" ? "Detector de Moods" : "Moods Detector"}
            </h2>
            <p>
              {language === "Spanish"
                ? "Seleccione su estado de ánimo o utilice la detección automática"
                : "Select your mood or use auto detection"}
            </p>
          </div>

          <div
            className="card p-4 mx-auto responsive-card"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              width: "85%",
              maxWidth: "700px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "auto",
              zIndex: 0,
            }}
          >
            {loading ? (
              <p className="text-center">
                {language === "Spanish" ? "Detectando..." : "Detecting..."}
              </p>
            ) : moodSaved ? (
              <p className="text-center">
                {language === "Spanish"
                  ? "Estado de ánimo guardado con éxito"
                  : "Mood saved successfully"}
              </p>
            ) : null}

            <section
              className="p-3 mood-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                justifyItems: "center",
              }}
            >
              {moods.map((mood, index) => (
                <div
                  key={index}
                  className="d-flex flex-column align-items-center justify-content-center mood-item"
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#DCBCEB",
                    borderRadius: "20px",
                    padding: "10px",
                    width: "120px",
                    height: "140px",
                    textAlign: "center",
                  }}
                  onClick={() => saveMood(mood.name)}
                >
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className="rounded-circle"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <h5
                    style={{
                      marginTop: "8px",
                      color: "#2F2F2F",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {moodTranslations[mood.name][language]}
                  </h5>
                </div>
              ))}
            </section>

            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn"
                style={{
                  backgroundColor: "#320048",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  color: "white",
                }}
                onClick={() => setIsAutomatic(true)}
              >
                {language === "Spanish"
                  ? "Detección Automática"
                  : "Automatic Detection"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`@media (max-width: 768px) {
        .responsive-card {
        width: 90% !important;
        max-width: 100% !important;
        height: auto !important;
        min-height: 60vh !important; /* Asegura que tenga altura suficiente */
        padding: 1rem !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important; /* Lo pega al fondo */
        align-self: stretch !important; /* Se estira si es necesario */
        position: absolute !important;
        margin-top: 50% !important; /* Empuja el card hacia abajo */
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 5 !important;
        margin-left: 5% !important; 
      }

      .mood-grid {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        gap: 0.5rem !important;
      }

      .mood-item {
        width: 100px !important;
        height: 120px !important;
        padding: 8px !important;
      }

      .mood-item img {
        width: 70px !important;
        height: 70px !important;
      }

      .mood-item h5 {
        font-size: 0.85rem !important;
      }

      .titulo-descripcion h2{
        text-align: center;
        width: 100%;
        margin: 0 auto;
        margin-top:13px
      }

      .titulo-descripcion h2,
      .titulo-descripcion p {
        text-align: center !important;
        width: 100% !important;
        margin-left: -6% !important; /* Desplazado a la izquierda */
      }
    }
  `}
      </style>
    </div>
  );
}
