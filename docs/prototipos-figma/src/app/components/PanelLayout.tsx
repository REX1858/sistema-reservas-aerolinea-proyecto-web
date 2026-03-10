import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X, LogOut, ChevronRight, Bell } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface PanelLayoutProps {
  role: "cliente" | "agente" | "admin";
  userName: string;
  userRole: string;
  navItems: NavItem[];
  children: React.ReactNode;
}

const ROLE_COLORS = {
  cliente: { bg: "bg-[#1E40AF]", light: "bg-blue-50", text: "text-blue-700", active: "bg-blue-100 text-blue-800", hover: "hover:bg-blue-50", badge: "bg-blue-600" },
  agente:  { bg: "bg-[#065F46]", light: "bg-emerald-50", text: "text-emerald-700", active: "bg-emerald-100 text-emerald-800", hover: "hover:bg-emerald-50", badge: "bg-emerald-600" },
  admin:   { bg: "bg-[#3730A3]", light: "bg-indigo-50", text: "text-indigo-700", active: "bg-indigo-100 text-indigo-800", hover: "hover:bg-indigo-50", badge: "bg-indigo-600" },
};

const ROLE_AVATARS = {
  cliente: "👤",
  agente: "🎫",
  admin: "⚙️",
};

export function PanelLayout({ role, userName, userRole, navItems, children }: PanelLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const colors = ROLE_COLORS[role];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`${colors.bg} px-5 py-5`}>
        <Link to="/" className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shrink-0">
            <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
              <path d="M8 24 L20 8 L32 24 L26 24 L26 32 L14 32 L14 24 Z" fill="#C8102E"/>
            </svg>
          </div>
          <div className="text-white">
            <div className="font-bold text-sm leading-none">TERRA</div>
            <div className="text-xs opacity-70 tracking-widest">SKY</div>
          </div>
        </Link>

        {/* User info */}
        <div className="flex items-center gap-3 bg-white/15 rounded-xl p-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
            {ROLE_AVATARS[role]}
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold truncate">{userName}</div>
            <div className="text-white/60 text-xs">{userRole}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-xs uppercase tracking-widest text-gray-400 px-3 mb-2">Menú</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm transition-all ${
                active
                  ? `${colors.active} font-semibold`
                  : `text-gray-600 ${colors.hover}`
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${active ? colors.text : "text-gray-400"}`} />
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className={`w-3.5 h-3.5 ${colors.text}`} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
        <Link
          to="/"
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
          Sitio público
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className={`${colors.bg} text-white px-4 sm:px-6 py-3 flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-white p-1.5 rounded hover:bg-white/20"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-white font-semibold text-sm sm:text-base">
                {navItems.find((n) => isActive(n.href))?.label || "Panel"}
              </h1>
              <p className="text-white/60 text-xs hidden sm:block">Terra Sky · {new Date().toLocaleDateString("es-CO", { dateStyle: "long" })}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-white/15 rounded-xl px-3 py-1.5">
              <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center text-xs">
                {ROLE_AVATARS[role]}
              </div>
              <span className="text-white text-xs">{userName.split(" ")[0]}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

