import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import Faq from "@/components/FAQ";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";

export default function FaqPage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <Faq />
      <NavBarFooterMoodify />
    </div>
  );
}
