import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Globe, ChevronDown, Menu, X, User, LogIn } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Reservar", href: "/" },
    { label: "Gestionar reserva", href: "/gestionar" },
    { label: "Check-in", href: "/checkin" },
    { label: "Estado de vuelos", href: "/estado" },
  ];

  return (
    <header className="bg-[#1B4332] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
                <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                  <path d="M8 24 L20 8 L32 24 L26 24 L26 32 L14 32 L14 24 Z" fill="#1B4332"/>
                  <circle cx="20" cy="20" r="18" stroke="#1B4332" strokeWidth="2" fill="none"/>
                  <path d="M6 22 Q20 10 34 22" stroke="#1B4332" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div className="text-white">
                <div className="font-bold text-lg leading-none">TERRA</div>
                <div className="text-xs tracking-widest opacity-90">SKY</div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-white text-sm px-3 py-2 rounded hover:bg-white/15 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-white text-sm px-3 py-2 rounded hover:bg-white/15 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>ES</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg py-1 min-w-[120px] z-50">
                  {["Español", "English", "Français", "Português"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLangOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login */}
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-white text-[#1B4332] text-sm px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors font-semibold"
            >
              <LogIn className="w-4 h-4" />
              Iniciar sesión
            </button>

            <button
              onClick={() => navigate("/registro")}
              className="flex items-center gap-2 border border-white text-white text-sm px-4 py-2 rounded-lg hover:bg-white/15 transition-colors"
            >
              <User className="w-4 h-4" />
              Registrarse
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#143126] border-t border-white/20 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-sm px-3 py-3 rounded hover:bg-white/15 transition-colors border-b border-white/10 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { navigate("/login"); setMobileOpen(false); }}
                className="flex-1 bg-white text-[#1B4332] text-sm px-4 py-2 rounded-lg font-semibold"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => { navigate("/registro"); setMobileOpen(false); }}
                className="flex-1 border border-white text-white text-sm px-4 py-2 rounded-lg"
              >
                Registrarse
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}