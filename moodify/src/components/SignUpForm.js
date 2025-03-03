import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";
import "@/app/styles/global.css";

export default function SignUpForm() {
  const { language } = useLanguage();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccept, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); 

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nombreUsuario ||
      !email ||
      !validateEmail(email) ||
      !password ||
      !termsAccept
    ) {
      setMessage({
        text:
          language === "Spanish"
            ? "Por favor, complete todos los campos correctamente."
            : "Please complete all fields correctly.",
        type: "error",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/usuarios/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreUsuario, email, password, termsAccept }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        setMessage({
          text:
            data.error ||
            (language === "Spanish"
              ? "Error al registrar usuario."
              : "Error registering user."),
          type: "error",
        });
      } else {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        setMessage({
          text:
            language === "Spanish"
              ? "¡Registro exitoso!"
              : "Registration successful!",
          type: "success",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage({
        text:
          language === "Spanish"
            ? "Error interno del servidor."
            : "Internal server error.",
        type: "error",
      });
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center vh-100 text-center"
      style={{
        background:
          "linear-gradient(to bottom left, #FFFFFF, #F4DCFF, #D781FF, #AE00FF)",
        marginBottom: "0",
      }}
    >
      <div
        className="card p-4 shadow-lg text-light"
        style={{ backgroundColor: "#1B1B1B", borderRadius: "10px" }}
      >
        <h2 className="text-light mb-4">
          {language === "Spanish"
            ? "Siente el ritmo, selecciona tu vibra, haz sonar tu mundo."
            : "Feel the rhythm, select your vibe, sound your world."}
        </h2>

        {message.text && (
          <div
            className={`alert mt-2 ${
              message.type === "error" ? "alert-danger" : "alert-success"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3 text-center"
            style={{
              backgroundColor: "#4A4A4A",
              color: "#AAAAAA",
              textAlign: "center",
            }}
            type="text"
            placeholder={
              language === "Spanish" ? "Nombre de Usuario" : "Username"
            }
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
          <input
            className="form-control mb-3 text-center"
            style={{
              backgroundColor: "#4A4A4A",
              color: "#AAAAAA",
              textAlign: "center",
            }}
            type="email"
            placeholder={language === "Spanish" ? "Email" : "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-3 text-center"
            style={{
              backgroundColor: "#4A4A4A",
              color: "#AAAAAA",
              textAlign: "center",
            }}
            type="password"
            placeholder={language === "Spanish" ? "Contraseña" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-check mb-3 d-flex justify-content-center">
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={termsAccept}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="form-check-label text-light">
              {language === "Spanish"
                ? "Acepto los términos y condiciones"
                : "I accept the terms and conditions"}
            </label>
          </div>
          <button
            className="btn w-100"
            style={{ backgroundColor: "#443B5C", color: "white" }}
            type="submit"
            disabled={isLoading} 
          >
            {isLoading ? (
              <div
                className="spinner-border text-light"
                style={{ width: "1.5rem", height: "1.5rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              language === "Spanish" ? "Registrarse" : "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
