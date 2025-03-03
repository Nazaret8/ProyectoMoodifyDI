"use client";
import ContactForm from "@/components/ContactForm";
import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";

export default function ContactoPage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <ContactForm />
      <NavBarFooterMoodify />
    </div>
  );
}
