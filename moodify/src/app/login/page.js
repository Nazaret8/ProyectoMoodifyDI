"use client";
import NavBarHeader from "@/components/NavBarHeader";
import LoginForm from "@/components/LoginForm";
import NavBarFooter from "@/components/NavBarFooter";

export default function LoginPage() {
  return (
    <div className="fade-in">
      <NavBarHeader />
      <LoginForm />
      <NavBarFooter />
    </div>
  );
}
