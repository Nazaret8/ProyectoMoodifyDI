import NavBarHeaderMoodify from "@/components/NavBarHeaderMoodify";
import PlaylistSongsPage from "@/components/ListaPlaylists";
import NavBarFooterMoodify from "@/components/NavBarFooterMoodify";

export default function PoliticaPrivacidadPage() {
  return (
    <div className="fade-in">
      <NavBarHeaderMoodify />
      <PlaylistSongsPage />
      <NavBarFooterMoodify />
    </div>
  );
}
