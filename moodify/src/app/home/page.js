"use client";
import { useEffect, useState } from "react";
import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import MoodsPlaylistSlider from "@/components/MoodsPlaylistSlider";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";

export default function PaginaPrincipal() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <MoodsPlaylistSlider />
      <NavBarFooterMoodify />
    </div>
  );
}
