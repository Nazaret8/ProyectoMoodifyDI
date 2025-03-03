"use client";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const { language } = useLanguage();

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email =
        language === "Spanish"
          ? "El email es obligatorio"
          : "Email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password =
        language === "Spanish"
          ? "La contraseña es obligatoria"
          : "Password is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataNormalized = {
      ...formData,
      email: formData.email.toLowerCase(),
    };

    setLoading(true);

    try {
      const response = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataNormalized),
      });

      const data = await response.json();

      setLoading(false);

      if (!response.ok) {
        setErrors({ general: data.error || "Error al iniciar sesión" });
        setSuccess(""); 
      } else {
        setSuccess(
          language === "Spanish"
            ? "Inicio de sesión exitoso"
            : "Login successful"
        );

        localStorage.setItem("userInfo", JSON.stringify(data.user));
        console.log("Usuario guardado en localStorage", data.user);

        window.location.href = "/home";
      }
    } catch (error) {
      setLoading(false);
      setErrors({
        general:
          language === "Spanish"
            ? "Error interno del servidor"
            : "Internal server error",
      });
      setSuccess("");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background:
          "linear-gradient(to bottom left, #FFFFFF, #F4DCFF, #D781FF, #AE00FF)",
      }}
    >
      <div
        className="p-4 rounded shadow-sm w-100 mx-3"
        style={{
          maxWidth: "400px",
          backgroundColor: "#1B1B1B",
        }}
      >
        <h2 className="text-center mb-4 text-white">
          {language === "Spanish" ? "Inicia sesión en Moodify" : "Login in to Moodify"}
        </h2>

        {success && (
          <div className="alert alert-success mt-2" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control w-100"
              placeholder={language === "Spanish" ? "Email" : "Email"}
              value={formData.email}
              onChange={handleChange}
              style={{
                backgroundColor: "#4A4A4A",
                color: "#AAAAAA",
              }}
            />
            {errors.email && (
              <div className="alert alert-danger mt-2" role="alert">
                {errors.email}
              </div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control w-100"
              placeholder={language === "Spanish" ? "Contraseña" : "Password"}
              value={formData.password}
              onChange={handleChange}
              style={{
                backgroundColor: "#4A4A4A",
                color: "#AAAAAA",
              }}
            />
            {errors.password && (
              <div className="alert alert-danger mt-2" role="alert">
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{
              backgroundColor: "#443B5C",
              color: "white",
            }}
            disabled={loading} 
          >
            {loading ? (
              <div
                className="spinner-border text-light"
                style={{ width: "1.5rem", height: "1.5rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              language === "Spanish" ? "Iniciar sesión" : "Log In"
            )}
          </button>

          {errors.general && (
            <div className="alert alert-danger mt-2" role="alert">
              {errors.general}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
