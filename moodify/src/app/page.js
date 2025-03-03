"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PaginaPrincipal from "./home/page";
import NavBarHeader from "@/components/NavBarHeader";
import { useLanguage } from "./context/LanguageContext ";
import NavBarFooter from "@/components/NavBarFooter";

export default function Home() {
  const [user, setUser] = useState(null);
  const { language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser && storedUser !== "undefined" && storedUser !== "") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        router.push("/home");
      } catch (error) {
        console.error("Error parsing stored user data", error);
      }
    } else {
      console.log("No user data found in localStorage");
    }
  }, [router]);

  const loginSuccess = (userData) => {
    if (userData && userData.email) {
      setUser(userData);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      router.push("/home");
    } else {
      console.error("Invalid user data", userData);
    }
  };

  return (
    <div>
      <NavBarHeader />
      <main
        className="d-flex flex-column justify-content-center align-items-center vh-100"
        style={{
          background:
            "linear-gradient(to bottom left, #FFFFFF, #F4DCFF, #D781FF, #AE00FF)",
        }}
      >
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              {!user ? (
                <div
                  className="card p-4 mx-auto"
                  style={{
                    backgroundColor: "#1B1B1B",
                    borderRadius: "15px",
                    maxWidth: "400px",
                    width: "100%",
                  }}
                >
                  <h1 className="text-white">Moodify</h1>
                  <p className="text-white">
                    {language === "Spanish"
                      ? "Entra a vivir una experiencia musical única"
                      : "Enter to live a unique musical experience"}
                  </p>
                  <img
                    src="LogoMoodify.png"
                    alt="Logo"
                    className="img-fluid w-75 mx-auto"
                  />
                </div>
              ) : (
                <PaginaPrincipal />
              )}
            </div>
          </div>
        </div>
      </main>
      <NavBarFooter />
    </div>
  );
}
