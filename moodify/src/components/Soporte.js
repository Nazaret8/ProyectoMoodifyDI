"use client";
import { useLanguage } from "@/app/context/LanguageContext ";

export default function Soporte() {
  const { language } = useLanguage();

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
            <h2 className="fw-bold">
              {language === "Spanish" ? "Soporte" : "Support"}
            </h2>
          </div>

          <div className="row d-flex align-items-stretch">
            <div className="col-md-6 mb-4 d-flex">
              <div
                className="card shadow-lg rounded d-flex flex-column h-100"
                style={{ backgroundColor: "#4A4A4A", color: "white" }}
              >
                <div className="card-body d-flex flex-column">
                  <h2 className="h5 fw-bold">
                    {language === "Spanish"
                      ? "No se detectan mis emociones correctamente"
                      : "My emotions are not detected correctly"}
                  </h2>
                  <ul className="list-group list-group-flush flex-grow-1">
                    <li className="list-group-item bg-transparent text-white">
                      {language === "Spanish"
                        ? "Asegúrate de seleccionar un estado de ánimo usando los botones disponibles en la app."
                        : "Make sure to select a mood using the available buttons in the app."}
                    </li>
                    <li className="list-group-item bg-transparent text-white">
                      {language === "Spanish"
                        ? "Reinicia la aplicación y vuelve a intentarlo."
                        : "Restart the app and try again."}
                    </li>
                    <li className="list-group-item bg-transparent text-white">
                      {language === "Spanish"
                        ? "Si el problema persiste, prueba cambiando manualmente tu estado de ánimo en la configuración."
                        : "If the problem persists, try manually changing your mood in the settings."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4 d-flex">
              <div
                className="card shadow-lg rounded d-flex flex-column h-100"
                style={{ backgroundColor: "#4A4A4A", color: "white" }}
              >
                <div className="card-body d-flex flex-column">
                  <h2 className="h5 fw-bold">
                    {language === "Spanish"
                      ? "La música no coincide con mi estado de ánimo"
                      : "The music does not match my mood"}
                  </h2>
                  <ul className="list-group list-group-flush flex-grow-1">
                    <li className="list-group-item bg-transparent text-white">
                      {language === "Spanish"
                        ? "Verifica que has seleccionado correctamente tu estado de ánimo."
                        : "Check that you have correctly selected your mood."}
                    </li>
                    <li className="list-group-item bg-transparent text-white">
                      {language === "Spanish"
                        ? "Asegúrate de que la aplicación esté actualizada a la última versión."
                        : "Make sure the app is updated to the latest version."}
                    </li>
                    <li className="list-group-item bg-transparent text-white">
                      {language === "Spanish"
                        ? "Revisa la configuración de personalización de la música en la app."
                        : "Check the music personalization settings in the app."}
                    </li>
                    <li className="list-group-item bg-transparent text-white">
                      {language === "Spanish"
                        ? "Prueba diferentes estados de ánimo y ajustes para ver si mejora la selección de música."
                        : "Try different mood selections and settings to see if music selection improves."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
