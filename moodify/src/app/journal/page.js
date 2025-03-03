import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";
import JournalMoods from "@/components/JournalMoods";
export default function CalendarPage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <JournalMoods />
      <NavBarFooterMoodify />
    </div>
  );
}
