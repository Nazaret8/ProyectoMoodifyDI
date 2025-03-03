"use client";
import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";
import MoodsList from "@/components/MoodsList";

export default function MoodsPage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <MoodsList />
      <NavBarFooterMoodify />
    </div>
  );
}
