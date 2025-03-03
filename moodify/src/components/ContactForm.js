"use client";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext ";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const templateParams = {
      to_name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      message: formData.message,
    };
  
    try {
      const emailResult = await emailjs.send(
        "service_t3cwh7q",  
        "template_l1ispqe", 
        templateParams,
        "PRybTEGrIcaDoeby2" 
      );
  
      console.log("Email sent:", emailResult);
  
      const dbResponse = await fetch("/api/contact", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (dbResponse.ok) {
        setFeedback({
          text:
            language === "Spanish"
              ? "¡Mensaje enviado con éxito!"
              : "Message sent successfully!",
          type: "success",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        throw new Error("Error saving data to the database");
      }
    } catch (error) {
      console.error("Error al enviar el correo o guardar los datos:", error);
      setFeedback({
        text:
          language === "Spanish"
            ? "Hubo un error al enviar tu mensaje o guardar los datos."
            : "There was an error sending your message or saving the data.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="container">
        <div
          className="card p-4 shadow-lg"
          style={{
            backgroundColor: "#1B1B1B",
            color: "white",
            borderRadius: "15px",
            maxWidth: "700px",
            margin: "auto",
          }}
        >
          <h2 className="text-center fw-bold">
            {language === "Spanish" ? "Contáctanos" : "Contact Us"}
          </h2>

          {feedback.text && (
            <div
              className={`alert mt-2 ${
                feedback.type === "error" ? "alert-danger" : "alert-success"
              }`}
              role="alert"
            >
              {feedback.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">
                      {language === "Spanish" ? "Nombre:" : "First Name:"}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="form-control text-white rounded-2 border-0 p-2"
                      style={{ backgroundColor: "#4A4A4A" }}
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label className="form-label">
                      {language === "Spanish" ? "Apellido:" : "Last Name:"}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="form-control text-white rounded-2 border-0 p-2"
                      style={{ backgroundColor: "#4A4A4A" }}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    {language === "Spanish" ? "Correo electrónico:" : "Email:"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control text-white rounded-2 border-0 p-2"
                    style={{ backgroundColor: "#4A4A4A" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    {language === "Spanish"
                      ? "Número de teléfono:"
                      : "Phone Number:"}
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="form-control text-white rounded-2 border-0 p-2"
                    style={{ backgroundColor: "#4A4A4A" }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    {language === "Spanish" ? "Mensaje:" : "Message:"}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-control text-white rounded-2 border-0 p-2"
                    rows="9"
                    style={{ backgroundColor: "#4A4A4A", resize: "none" }}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="text-center div-boton">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn fw-bold px-4 py-2 btn-contact"
                style={{
                  backgroundColor: "#443B5C", 
                  borderRadius: "15px",       
                  color: "white",           
                  border: "none",            
                }}
              >
                {isSubmitting ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">
                      {language === "Spanish" ? "Cargando..." : "Loading..."}
                    </span>
                  </div>
                ) : language === "Spanish" ? (
                  "Enviar mensaje"
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
