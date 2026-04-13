"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegistroPage() {
  const [form, setForm] = useState({ nombre: "", email: "", nit: "", empresa: "", password: "", plan: "negocio" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          nombre: form.nombre,
          nit: form.nit,
          empresa: form.empresa,
          plan: form.plan,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      window.location.href = "/dashboard";
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#0078B4] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-[#003366] mb-2">¡Cuenta creada!</h1>
          <p className="text-gray-600 mb-6">Revisa tu email ({form.email}) para confirmar tu cuenta. Luego podrás iniciar sesión.</p>
          <a href="/login" className="bg-[#003366] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#001a33] transition inline-block">
            Ir a Iniciar Sesión
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#0078B4] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#003366] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-[#003366]">Crear Cuenta Gratis</h1>
          <p className="text-gray-500 text-sm mt-1">14 días de prueba gratis. Sin tarjeta de crédito.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>
        )}



        <form className="space-y-3" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" value={form.nombre} onChange={(e) => update("nombre", e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl py-2.5 px-3 focus:border-[#003366] focus:outline-none transition text-sm" placeholder="Juan Pérez" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl py-2.5 px-3 focus:border-[#003366] focus:outline-none transition text-sm" placeholder="juan@empresa.com" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIT de la empresa</label>
              <input type="text" value={form.nit} onChange={(e) => update("nit", e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl py-2.5 px-3 focus:border-[#003366] focus:outline-none transition text-sm" placeholder="900123456-7" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Razón social</label>
              <input type="text" value={form.empresa} onChange={(e) => update("empresa", e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl py-2.5 px-3 focus:border-[#003366] focus:outline-none transition text-sm" placeholder="Mi Empresa S.A.S." required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña (mínimo 6 caracteres)</label>
            <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl py-2.5 px-3 focus:border-[#003366] focus:outline-none transition text-sm" placeholder="••••••••" required minLength={6} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
            <select value={form.plan} onChange={(e) => update("plan", e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl py-2.5 px-3 focus:border-[#003366] focus:outline-none transition text-sm bg-white">
              <option value="starter">Factura+Cobra — $180K/mes</option>
              <option value="negocio">Negocio — $380K/mes ⭐ Popular</option>
              <option value="distribuidor">Distribuidor — $650K/mes</option>
              <option value="enterprise">Enterprise — $1.2M/mes</option>
            </select>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#e63946] text-white rounded-xl py-3 font-semibold hover:bg-[#c62828] transition mt-2 disabled:opacity-50">
            {loading ? "Creando cuenta..." : "Crear cuenta gratis →"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes cuenta? <a href="/login" className="text-[#0078B4] font-semibold hover:underline">Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
}
