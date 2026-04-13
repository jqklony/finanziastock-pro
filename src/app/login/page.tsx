"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email, password
    });
    
    if (authError) {
      setError(authError.message === "Invalid login credentials" 
        ? "Email o contraseña incorrectos" 
        : authError.message);
      setLoading(false);
      return;
    }
    
    if (data.session) {
      window.location.href = "/dashboard";
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#0078B4] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#003366] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h1 className="text-2xl font-bold text-[#003366]">Iniciar Sesión</h1>
          <p className="text-gray-500 text-sm mt-1">Accede a FinanziaStock Pro</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl mb-4 text-sm">
          💡 Ingrese con su email y contraseña. El registro es gratis.
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-[#003366] focus:outline-none transition"
              placeholder="tu@empresa.com" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-[#003366] focus:outline-none transition"
              placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-[#003366] text-white rounded-xl py-3 font-semibold hover:bg-[#001a33] transition disabled:opacity-50">
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes cuenta? <a href="/registro" className="text-[#0078B4] font-semibold hover:underline">Regístrate gratis</a>
        </p>
      </div>
    </div>
  );
}
