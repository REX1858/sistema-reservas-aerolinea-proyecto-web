import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, LogIn, UserCheck, User, Settings, ArrowRight } from "lucide-react";

type Role = "cliente" | "agente" | "admin";

const ROLE_CONFIG: Record<Role, {
  label: string;
  icon: React.ElementType;
  color: string;
  activeColor: string;
  description: string;
  hint: string;
  redirect: string;
  testEmail: string;
  testPass: string;
}> = {
  cliente: {
    label: "Cliente",
    icon: User,
    color: "text-blue-600",
    activeColor: "bg-blue-600",
    description: "Busca vuelos, realiza reservas y gestiona tus viajes",
    hint: "carlos.ramirez@email.com / 1234",
    redirect: "/cliente",
    testEmail: "carlos.ramirez@email.com",
    testPass: "1234",
  },
  agente: {
    label: "Agente",
    icon: UserCheck,
    color: "text-emerald-600",
    activeColor: "bg-emerald-600",
    description: "Gestiona reservas, confirma pagos y asigna asientos",
    hint: "agente@aerolinea.com / 1234",
    redirect: "/agente",
    testEmail: "agente@aerolinea.com",
    testPass: "1234",
  },
  admin: {
    label: "Administrador",
    icon: Settings,
    color: "text-indigo-600",
    activeColor: "bg-indigo-600",
    description: "Administra vuelos, clientes, paquetes y reportes",
    hint: "admin@aerolinea.com / 1234",
    redirect: "/admin",
    testEmail: "admin@aerolinea.com",
    testPass: "1234",
  },
};

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<Role>("cliente");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const config = ROLE_CONFIG[role];

  const handleRoleChange = (r: Role) => {
    setRole(r);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setLoading(false);
      navigate(config.redirect);
    }, 700);
  };

  const handleQuickLogin = () => {
    setEmail(config.testEmail);
    setPassword(config.testPass);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(config.redirect);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-[#1B4332] rounded-full flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                <path d="M10 26 L20 10 L30 26 L24 26 L24 32 L16 32 L16 26 Z" fill="white" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-gray-900 text-lg tracking-tight">TERRA</div>
              <div className="text-xs text-gray-500 tracking-[0.3em] uppercase">Sky</div>
            </div>
          </Link>
          <h1 className="text-gray-900 mb-1">Iniciar sesión</h1>
          <p className="text-gray-500 text-sm">Selecciona tu perfil para acceder al sistema</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-7">
          {/* Role selector */}
          <div className="flex gap-1.5 mb-6">
            {(Object.keys(ROLE_CONFIG) as Role[]).map((r) => {
              const rc = ROLE_CONFIG[r];
              const Icon = rc.icon;
              const isActive = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleChange(r)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 px-1 rounded-xl text-xs transition-all border-2 ${
                    isActive
                      ? `border-current ${rc.color} bg-gray-50 shadow-sm`
                      : "border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-600"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? rc.color : ""}`} />
                  <span className={`font-semibold ${isActive ? rc.color : ""}`}>{rc.label}</span>
                </button>
              );
            })}
          </div>

          {/* Role description */}
          <div className={`text-xs text-center mb-5 px-3 py-2 rounded-xl bg-gray-50 ${config.color}`}>
            {config.description}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm bg-gray-50"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-gray-700">Contraseña</label>
                <button type="button" className="text-xs text-[#0E7490] hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] text-sm bg-gray-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 text-white py-3 rounded-xl transition-all font-semibold mt-2 ${config.activeColor} hover:opacity-90 disabled:opacity-70`}
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31" strokeDashoffset="10" />
                </svg>
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? "Verificando..." : "Iniciar sesión"}
            </button>
          </form>

          {/* Quick access hint */}
          <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-xs text-gray-400 mb-1.5 text-center">Acceso de prueba para {config.label}</p>
            <p className="text-xs text-gray-500 text-center font-mono mb-2">{config.hint}</p>
            <button
              type="button"
              onClick={handleQuickLogin}
              className={`w-full flex items-center justify-center gap-2 text-xs py-2 rounded-lg border transition-colors ${config.color} border-current hover:bg-gray-100`}
            >
              <ArrowRight className="w-3 h-3" />
              Entrar como {config.label} (demo)
            </button>
          </div>

          {role === "cliente" && (
            <div className="text-center mt-5 text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" className="text-[#0E7490] font-semibold hover:underline">
                Regístrate gratis
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          <Link to="/" className="hover:underline">← Volver al sitio público</Link>
        </p>
      </div>
    </div>
  );
}
