import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";
import UserLibrary from "@/components/UserLibrary";
import MoodsDetector from "@/components/MoodsDetector";
export default function DetectorPage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <MoodsDetector />
      <NavBarFooterMoodify />
    </div>
  );
}
