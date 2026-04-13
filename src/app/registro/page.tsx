"use client";
import { useState } from "react";

export default function RegistroPage() {
  const [form, setForm] = useState({ nombre: "", email: "", nit: "", empresa: "", password: "", plan: "negocio" });
  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#0078B4] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#003366] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-[#003366]">Crear Cuenta Gratis</h1>
          <p className="text-gray-500 text-sm mt-1">Empiece a controlar las finanzas de su empresa con IA</p>
        </div>

        <div className="space-y-3 mb-5">
          <button className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl py-3 px-4 hover:bg-gray-50 transition font-medium text-gray-700">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Registrarse con Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-black text-white rounded-xl py-3 px-4 hover:bg-gray-900 transition font-medium">
            <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Registrarse con Apple
          </button>
        </div>

        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-400">o completa el formulario</span></div>
        </div>

        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); window.location.href = "/dashboard"; }}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" value={form.nombre} onChange={(e) => update("nombre", e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl py-2.5 px-3 focus:border-[#003366] focus:outline-none transition text-sm" placeholder="Juan Pérez" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email empresarial</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl py-2.5 px-3 focus:border-[#003366] focus:outline-none transition text-sm" placeholder="Mínimo 8 caracteres" required />
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
          <button type="submit" className="w-full bg-[#e63946] text-white rounded-xl py-3 font-semibold hover:bg-[#c62828] transition mt-2">
            Crear cuenta gratis →
          </button>
          <p className="text-xs text-gray-400 text-center">14 días de prueba gratis. No se requiere tarjeta de crédito.</p>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes cuenta? <a href="/login" className="text-[#0078B4] font-semibold hover:underline">Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
}
