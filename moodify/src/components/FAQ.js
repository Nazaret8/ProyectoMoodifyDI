"use client";
import { useLanguage } from "@/app/context/LanguageContext ";

export default function Faq() {
  const { language } = useLanguage();

  const translate = (spanish, english) => {
    return language === "Spanish" ? spanish : english;
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom left, #ffffff, #F4DCFF, #D781FF, #AE00FF)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="container py-5">
        <div
          className="card p-4"
          style={{ backgroundColor: "#1B1B1B", color: "white" }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold">{translate("FAQ's ", "FAQ's")}</h2>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div
                className="card shadow-lg rounded"
                style={{ backgroundColor: "#4A4A4A", color: "white" }}
              >
                <div className="card-body">
                  <h2 className="h5 fw-bold">
                    {translate(
                      "¿Qué es Moodify y cómo funciona?",
                      "What is Moodify and how does it work?"
                    )}
                  </h2>
                  <p>
                    {translate(
                      "Moodify es una aplicación que personaliza tu experiencia musical según tu estado de ánimo.",
                      "Moodify is an app that customizes your music experience based on your mood."
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card shadow-lg rounded"
                style={{ backgroundColor: "#4A4A4A", color: "white" }}
              >
                <div className="card-body">
                  <h2 className="h5 fw-bold">
                    {translate(
                      "¿Cómo determina Moodify mi estado de ánimo?",
                      "How does Moodify determine my mood?"
                    )}
                  </h2>
                  <p>
                    {translate(
                      "Puedes detectar tu estado de ánimo utilizando los botones disponibles en la app.",
                      "You can detect your mood using the available buttons in the app."
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card shadow-lg rounded"
                style={{ backgroundColor: "#4A4A4A", color: "white" }}
              >
                <div className="card-body">
                  <h2 className="h5 fw-bold">
                    {translate(
                      "¿Funciona Moodify sin conexión a Internet?",
                      "Does Moodify work offline?"
                    )}
                  </h2>
                  <p>
                    {translate(
                      "Moodify requiere una conexión a Internet para acceder a su catálogo musical y generar listas personalizadas.",
                      "Moodify requires an internet connection to access its music catalog and generate personalized playlists."
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card shadow-lg rounded"
                style={{ backgroundColor: "#4A4A4A", color: "white" }}
              >
                <div className="card-body">
                  <h2 className="h5 fw-bold">
                    {translate(
                      "¿Puedo compartir mis estados de ánimo con otros usuarios?",
                      "Can I share my moods with other users?"
                    )}
                  </h2>
                  <p>
                    {translate(
                      "Sí, Moodify te permite compartir tus estados de ánimo a través de un diario y un calendario de emociones.",
                      "Yes, Moodify allows you to share your moods through a diary and an emotion calendar."
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card shadow-lg rounded"
                style={{ backgroundColor: "#4A4A4A", color: "white" }}
              >
                <div className="card-body">
                  <h2 className="h5 fw-bold">
                    {translate(
                      "¿Con qué frecuencia puedo actualizar mi estado de ánimo?",
                      "How often can I update my mood?"
                    )}
                  </h2>
                  <p>
                    {translate(
                      "Puedes cambiar tu estado de ánimo tantas veces como desees para mejorar la personalización de la música.",
                      "You can change your mood as often as you want to improve music personalization."
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card shadow-lg rounded"
                style={{ backgroundColor: "#4A4A4A", color: "white" }}
              >
                <div className="card-body">
                  <h2 className="h5 fw-bold">
                    {translate(
                      "¿Cómo personaliza Moodify mis listas de reproducción?",
                      "How does Moodify personalize my playlists?"
                    )}
                  </h2>
                  <p>
                    {translate(
                      "Moodify analiza tu estado de ánimo seleccionado y genera listas de reproducción basadas en tus preferencias musicales.",
                      "Moodify analyzes your selected mood and generates playlists based on your music preferences."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
