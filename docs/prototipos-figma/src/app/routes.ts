import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SearchResults } from "./pages/SearchResults";
import { Booking } from "./pages/Booking";
import { ManageBooking } from "./pages/ManageBooking";
import { CheckIn } from "./pages/CheckIn";
import { FlightStatus } from "./pages/FlightStatus";

// ── Paneles ──────────────────────────────────────────
import { ClienteDashboard } from "./pages/cliente/ClienteDashboard";
import { ClienteBuscar } from "./pages/cliente/ClienteBuscar";
import { ClienteReservas } from "./pages/cliente/ClienteReservas";
import { ClientePaquetes } from "./pages/cliente/ClientePaquetes";
import { ClienteHistorial } from "./pages/cliente/ClienteHistorial";
import { ClientePerfil } from "./pages/cliente/ClientePerfil";

import { AgenteDashboard } from "./pages/agente/AgenteDashboard";
import { AgenteReservas } from "./pages/agente/AgenteReservas";
import { AgentePagos } from "./pages/agente/AgentePagos";
import { AgenteAsientos } from "./pages/agente/AgenteAsientos";
import { AgenteClientes } from "./pages/agente/AgenteClientes";
import { AgenteVuelos } from "./pages/agente/AgenteVuelos";

import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminVuelos } from "./pages/admin/AdminVuelos";
import { AdminClientes } from "./pages/admin/AdminClientes";
import { AdminPaquetes } from "./pages/admin/AdminPaquetes";
import { AdminDestinos } from "./pages/admin/AdminDestinos";
import { AdminReportes } from "./pages/admin/AdminReportes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      // ── Público ──────────────────────────────────
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "registro", Component: Login },
      { path: "resultados", Component: SearchResults },
      { path: "reservar", Component: Booking },
      { path: "gestionar", Component: ManageBooking },
      { path: "checkin", Component: CheckIn },
      { path: "estado", Component: FlightStatus },

      // ── Panel Cliente ─────────────────────────────
      { path: "cliente", Component: ClienteDashboard },
      { path: "cliente/buscar", Component: ClienteBuscar },
      { path: "cliente/reservas", Component: ClienteReservas },
      { path: "cliente/paquetes", Component: ClientePaquetes },
      { path: "cliente/historial", Component: ClienteHistorial },
      { path: "cliente/perfil", Component: ClientePerfil },

      // ── Panel Agente ──────────────────────────────
      { path: "agente", Component: AgenteDashboard },
      { path: "agente/reservas", Component: AgenteReservas },
      { path: "agente/pagos", Component: AgentePagos },
      { path: "agente/asientos", Component: AgenteAsientos },
      { path: "agente/clientes", Component: AgenteClientes },
      { path: "agente/vuelos", Component: AgenteVuelos },

      // ── Panel Admin ───────────────────────────────
      { path: "admin", Component: AdminDashboard },
      { path: "admin/vuelos", Component: AdminVuelos },
      { path: "admin/clientes", Component: AdminClientes },
      { path: "admin/paquetes", Component: AdminPaquetes },
      { path: "admin/destinos", Component: AdminDestinos },
      { path: "admin/reportes", Component: AdminReportes },
    ],
  },
]);