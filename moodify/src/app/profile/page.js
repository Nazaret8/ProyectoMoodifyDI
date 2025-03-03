"use client";
import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";
import Profile from "@/components/ProfileCard";
export default function ProfilePage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <Profile />
      <NavBarFooterMoodify />
    </div>
  );
}
