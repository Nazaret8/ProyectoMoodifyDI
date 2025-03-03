'use client'
import SignUpForm from "@/components/SignUpForm";
import NavBarHeader from "@/components/NavBarHeader";
import NavBarFooter from "@/components/NavBarFooter";
export default function SignUpPage() {
  return (
    <div className="fade-in">
      <NavBarHeader />
      <SignUpForm />
      <NavBarFooter />
    </div>
  );
}
