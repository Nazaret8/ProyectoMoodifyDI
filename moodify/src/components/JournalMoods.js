"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLanguage } from "@/app/context/LanguageContext ";
import UserLibrary from "./UserLibrary";

export default function JournalMoods() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [moodDiary, setMoodDiary] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const { language } = useLanguage();

  async function fetchEstados() {
    const response = await fetch("/api/diario");
    const data = await response.json();
    console.log("Datos recibidos del backend:", data);
    setMoodDiary(data);
  }

  useEffect(() => {
    fetchEstados();
    setIsClient(true);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getMoodForSelectedDate = () => {
    if (!selectedDate) return null;

    const selectedDateString = selectedDate.toLocaleDateString("en-CA");
    console.log("Fecha seleccionada:", selectedDateString);

    const mood = moodDiary.find(
      (item) => item.fechaActualEstado === selectedDateString
    );

    console.log("Estado encontrado:", mood);

    return mood
      ? mood.estado
      : language === "Spanish"
      ? "No hay estado registrado para este día."
      : "No mood recorded for this day.";
  };

  const handleShareWhatsapp = () => {
    const mood = getMoodForSelectedDate();
    const whatsappMessage =
      language === "Spanish"
        ? `*Moodify* - Diario de Estado de Ánimo\n\nHoy, en mi diario de Moodify, comparto mi estado:\n\n"${mood}"\n\n¡Únete a Moodify y lleva tu bienestar al siguiente nivel!`
        : `*Moodify* - Mood Journal\n\nToday, in my Moodify journal, I share my mood:\n\n"${mood}"\n\nJoin Moodify and take your well-being to the next level!`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareTwitter = () => {
    const mood = getMoodForSelectedDate();
    const twitterMessage =
      language === "Spanish"
        ? `Hoy en mi diario Moodify:\n"${mood}"\n\n#Moodify #Bienestar #DiarioDeEstado`
        : `Today in my Moodify journal:\n"${mood}"\n\n#Moodify #Wellbeing #MoodJournal`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      twitterMessage
    )}`;
    window.open(twitterUrl, "_blank");
  };

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="container-fluid flex-column align-items-center justify-content-center p-0"
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom left, #ffffff, #F4DCFF, #D781FF, #AE00FF)",
      }}
    >
      <div className="row no-gutters" style={{ height: "100%" }}>
        <div className="col-3 p-0 user-library">
          <UserLibrary />
        </div>
        <div
          className="col-md-8 col-12 d-flex flex-column align-items-center justify-content-center"
          style={{ height: "100%", textAlign: "center" }}
        >
          <div
            className="card p-4 shadow-sm d-flex flex-column align-items-center justify-content-center"
            style={{
              width: "70%",
              minHeight: "400px",
              borderRadius: "15px",
              boxShadow: "none",
              padding: "20px",
              marginTop: "5",
            }}
          >
            <style>
            {`
              .react-calendar {
                width: 100%;
                border: none;
                background: transparent;
              }

              .react-calendar__tile {
                transition: background-color 0.3s ease-in-out;
                border-radius: 8px;
                font-size: 14px;
                color: #333;
              }

              .react-calendar__tile:hover {
                background-color: rgb(158, 103, 158) !important;
                color: white;
                border-radius: 8px;
              }

              .react-calendar__tile--active {
                background-color: rgb(100, 12, 138) !important;
                color: white;
                font-weight: bold;
                border-radius: 8px;
              }

              .react-calendar__tile--today {
                background-color: #320048 !important;
                color: white !important;
                font-weight: bold;
                border-radius: 8px;
              }

              .react-calendar__month-view__weekdays {
                font-weight: bold;
                color: #888;
                font-size: 12px;
              }

              .react-calendar__navigation {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
              max-width: 100%;
              overflow: hidden;
              } 

              .react-calendar__navigation__label {
                font-weight: bold;
                color: #333;
                font-size: 16px;
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis; 
                max-width: 80%; 
                text-align: center;
                }

                .btn-share {
                  background-color: #320048;
                  color: #FFF;
                  transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .btn-share:hover {
                  background-color: #510072 !important;
                  transform: scale(1.05);
                  color: #FFF;
                }

                .react-calendar__navigation button:enabled:not(.react-calendar__navigation__label) {
                background-color: #320048 !important;
                color: white !important;
                border-radius: 5px;
                padding: 5px 10px;
                transition: background-color 0.3s ease-in-out;
              }

              .react-calendar__navigation button:enabled:not(.react-calendar__navigation__label):hover {
                background-color: #510072 !important;
              }

              @media (max-width: 768px) {
                .col-md-8 {
                  width: 100% !important;
                  flex: 1;
                }

              .card {
                width: 90% !important;
                max-width: 400px;
                position: relative;
                margin-top: -20px; 
                padding: 20px !important;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.95);
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }

              .react-calendar {
                width: 100%;
                max-width: 320px; 
                min-width: 300px;
                border: none;
                background: transparent;
                padding: 10px;
              }

              .react-calendar__navigation {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 14px;
                max-width: 100%;
                overflow: hidden;
              }

              .react-calendar__navigation__label {
                font-weight: bold;
                color: #333;
                font-size: 16px;
                white-space: nowrap; 
                overflow: hidden; 
                text-overflow: ellipsis; 
                max-width: 80%; 
                text-align: center;
              }
                
              .react-calendar__navigation__label {
                font-size: 16px;
              }

              .user-library {
                display: none !important;
              }
            }
          `}
            </style>
            <div
              style={{
                maxHeight: "calc(100vh - 250px)",
                overflowX: "auto",
                whiteSpace: "nowrap",
                scrollbarWidth: "thin",
                scrollbarColor: "#D781FF transparent",
                paddingBottom: "10px",
              }}
            >
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="table table-bordered text-center"
                tileClassName={({ date }) => {
                  const today = new Date().toDateString();
                  const selected = selectedDate
                    ? selectedDate.toDateString()
                    : "";
                  const isToday = date.toDateString() === today;
                  const isSelected = date.toDateString() === selected;

                  return isSelected
                    ? "react-calendar__tile--active"
                    : isToday
                    ? "react-calendar__tile--today"
                    : "";
                }}
              />
            </div>

            {selectedDate && (
              <div className="mt-3 w-100 text-center">
                <p
                  className="alert"
                  style={{
                    backgroundColor: "#EFEFEF",
                    color: "#000",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {getMoodForSelectedDate()}
                </p>

                <div>
                  <button
                    className="btn btn-share w-100 mb-2"
                    onClick={handleShareWhatsapp}
                  >
                    <img src="/icons/whatsapp.png"></img>
                  </button>

                  <button
                    className="btn btn-share w-100"
                    onClick={handleShareTwitter}
                  >
                    <img src="/icons/twitterx.png"></img>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
