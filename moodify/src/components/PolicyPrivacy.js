"use client";
import { useLanguage } from "@/app/context/LanguageContext ";

export default function PoliticaPrivacidad() {
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
      <div
        className="card p-4 shadow-lg"
        style={{
          backgroundColor: "#1B1B1B",
          color: "white",
          borderRadius: "15px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-center fw-bold mb-3">
              {language === "Spanish"
                ? "Política de Privacidad"
                : "Privacy Policy"}
            </h2>
            {[
              {
                title:
                  language === "Spanish"
                    ? "Datos que recopilamos"
                    : "Data We Collect",
                text:
                  language === "Spanish"
                    ? "Información personal: nombre de usuario, correo electrónico, contraseña, preferencias musicales, teléfono móvil, nombre..."
                    : "Personal information: username, email, password, music preferences, mobile phone, name...",
              },
              {
                title:
                  language === "Spanish"
                    ? "Intercambio de información"
                    : "Information Sharing",
                text:
                  language === "Spanish"
                    ? "Podemos compartir datos con proveedores de servicios y para cumplir con obligaciones legales. Solo compartimos datos con su consentimiento cuando sea necesario."
                    : "We may share data with service providers and to comply with legal obligations. We only share data with your consent when necessary.",
              },
              {
                title:
                  language === "Spanish"
                    ? "Retenciones y Derechos"
                    : "Retention and Rights",
                text:
                  language === "Spanish"
                    ? "Conservamos tus datos mientras utilizas la app. Podrás acceder, rectificar o eliminar tu información en cualquier momento."
                    : "We retain your data while you use the app. You can access, correct, or delete your information at any time.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card mb-3 text-white text-center"
                style={{
                  backgroundColor: "#333",
                  borderRadius: "10px",
                  minHeight: "180px",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-6">
            <h2 className="text-center fw-bold mb-3">
              {language === "Spanish"
                ? "Términos y Condiciones"
                : "Terms and Conditions"}
            </h2>
            {[
              {
                title:
                  language === "Spanish"
                    ? "Uso de la Aplicación"
                    : "Use of the Application",
                text:
                  language === "Spanish"
                    ? "Moodify es sólo para uso personal. Está prohibido cualquier uso indebido, como modificar la aplicación o intentar piratearla."
                    : "Moodify is for personal use only. Any misuse, such as modifying the app or attempting to hack it, is prohibited.",
              },
              {
                title: language === "Spanish" ? "Contenido" : "Content",
                text:
                  language === "Spanish"
                    ? "El contenido de Moodify es propiedad nuestra o de nuestros socios y está protegido por derechos de autor."
                    : "The content of Moodify is owned by us or our partners and is protected by copyright.",
              },
              {
                title: language === "Spanish" ? "Suspensión" : "Suspension",
                text:
                  language === "Spanish"
                    ? "Podemos suspender o cancelar su acceso si viola estos términos."
                    : "We may suspend or cancel your access if you violate these terms.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card mb-3 text-white text-center"
                style={{
                  backgroundColor: "#333",
                  borderRadius: "10px",
                  minHeight: "180px",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
