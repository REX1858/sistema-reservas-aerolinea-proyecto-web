import { Outlet, useLocation } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Rutas que no muestran el header/footer público (tienen su propio layout)
const PANEL_PREFIXES = ["/cliente", "/agente", "/admin"];
const NO_HEADER_PATHS = ["/login", "/registro"];
const NO_FOOTER_PATHS = ["/reservar", "/resultados", "/checkin", "/gestionar", "/estado", "/reservar"];

export function Root() {
  const { pathname } = useLocation();

  const isPanel = PANEL_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const noHeader = NO_HEADER_PATHS.includes(pathname) || isPanel;
  const noFooter = NO_FOOTER_PATHS.some((p) => pathname.startsWith(p)) || isPanel;

  return (
    <div className="min-h-screen flex flex-col">
      {!noHeader && <Header />}
      <div className={`flex-1 ${!noHeader ? "" : ""}`}>
        <Outlet />
      </div>
      {!noHeader && !noFooter && <Footer />}
    </div>
  );
}
