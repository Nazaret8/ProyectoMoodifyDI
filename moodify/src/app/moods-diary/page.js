"use client";
import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";
import MoodsDiary from "@/components/MoodsDiary";

export default function MoodsDiaryPage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <MoodsDiary />
      <NavBarFooterMoodify />
    </div>
  );
}
