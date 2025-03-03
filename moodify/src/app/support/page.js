import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";
import Soporte from "@/components/Soporte";

export default function SoportePage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <Soporte />
      <NavBarFooterMoodify />
    </div>
  );
}
