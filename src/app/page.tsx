export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#0078B4]">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#003366] font-bold text-xl">F</span>
          </div>
          <span className="text-white font-bold text-xl">FinanziaStock Pro</span>
        </div>
        <div className="flex gap-4">
          <a href="/login" className="text-white/80 hover:text-white transition">Iniciar Sesión</a>
          <a href="/registro" className="bg-white text-[#003366] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Registrarse Gratis
          </a>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Todo el ciclo financiero de su empresa<br />
            <span className="text-[#e9c46a]">en una sola plataforma con IA</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
            Inventario inteligente + Facturación DIAN + Cobranza automática + Contabilidad con IA.
            Para distribuidores mayoristas y PYMES que quieren dejar de perder dinero.
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <a href="/registro" className="bg-[#e63946] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#c62828] transition shadow-lg">
              Empezar Gratis →
            </a>
            <a href="#modulos" className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition border border-white/30">
              Ver Módulos
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-20">
          {[
            { num: "395K+", label: "Empresas potenciales en Colombia" },
            { num: "8", label: "Modelos de IA integrados" },
            { num: "13", label: "APIs conectadas" },
            { num: "30%", label: "Reducción en cartera vencida" },
          ].map((s, i) => (
            <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
              <div className="text-3xl font-bold text-[#e9c46a]">{s.num}</div>
              <div className="text-sm text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div id="modulos" className="grid grid-cols-3 gap-6 mb-20">
          {[
            { icon: "📦", title: "Inventario Inteligente", desc: "Predicción de demanda con IA. Punto de reorden automático. Multi-bodega." },
            { icon: "💰", title: "Facturación DIAN", desc: "Facturas electrónicas válidas. Envío por WhatsApp. Portal de pedidos B2B." },
            { icon: "📋", title: "Cobranza con IA", desc: "Scoring de riesgo por cliente. Cobro automático por WhatsApp con link de pago." },
            { icon: "📊", title: "Contabilidad IA", desc: "Conciliación bancaria automática. Estados financieros en tiempo real." },
            { icon: "🛒", title: "Compras", desc: "Órdenes sugeridas por IA. Comparador de proveedores. OCR de facturas." },
            { icon: "🤖", title: "IA Transversal", desc: "Flujo de caja predictivo. Chatbot contable. Detección de anomalías." },
          ].map((m, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-3">{m.icon}</div>
              <h3 className="text-lg font-bold text-[#003366] mb-2">{m.title}</h3>
              <p className="text-gray-600 text-sm">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-10 border border-white/20 mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            El ciclo completo del dinero, automatizado
          </h2>
          <div className="flex items-center justify-between">
            {[
              { step: "1", label: "Comprar", sub: "IA sugiere qué y cuánto" },
              { step: "2", label: "Almacenar", sub: "Stock en tiempo real" },
              { step: "3", label: "Vender", sub: "Factura DIAN automática" },
              { step: "4", label: "Cobrar", sub: "WhatsApp + link de pago" },
              { step: "5", label: "Contabilizar", sub: "Asientos automáticos" },
              { step: "6", label: "Reinvertir", sub: "Flujo de caja predicho" },
            ].map((s, i) => (
              <div key={i} className="text-center flex-1">
                <div className="w-12 h-12 bg-[#e9c46a] rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-[#003366] font-bold">{s.step}</span>
                </div>
                <div className="text-white font-semibold text-sm">{s.label}</div>
                <div className="text-white/60 text-xs mt-1">{s.sub}</div>
                {i < 5 && <div className="text-white/40 text-2xl mt-2">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-8">Planes</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Factura+Cobra", price: "$180K", features: ["Facturación DIAN", "Cobranza básica", "50 clientes", "100 facturas/mes"] },
              { name: "Negocio", price: "$380K", popular: true, features: ["Todo Factura+Cobra", "Contabilidad IA", "Conciliación bancaria", "200 clientes"] },
              { name: "Distribuidor", price: "$650K", features: ["Todo Negocio", "Inventario + Predicción", "Compras", "500 clientes"] },
              { name: "Enterprise", price: "$1.2M", features: ["Todo ilimitado", "API", "Multi-sucursal", "Soporte prioritario"] },
            ].map((p, i) => (
              <div key={i} className={`rounded-xl p-6 ${p.popular ? 'bg-white shadow-2xl scale-105' : 'bg-white/10 border border-white/20'}`}>
                <div className={`text-sm font-semibold ${p.popular ? 'text-[#e63946]' : 'text-white/70'}`}>
                  {p.popular && '⭐ MÁS POPULAR'}
                  {!p.popular && p.name}
                </div>
                <div className={`text-sm font-semibold mt-1 ${p.popular ? 'text-[#003366]' : 'text-white'}`}>{p.popular && p.name}</div>
                <div className={`text-3xl font-bold my-3 ${p.popular ? 'text-[#003366]' : 'text-white'}`}>
                  {p.price}<span className={`text-sm font-normal ${p.popular ? 'text-gray-500' : 'text-white/60'}`}>/mes</span>
                </div>
                <ul className="text-left space-y-2 mb-4">
                  {p.features.map((f, j) => (
                    <li key={j} className={`text-sm ${p.popular ? 'text-gray-600' : 'text-white/70'}`}>✓ {f}</li>
                  ))}
                </ul>
                <a href="/registro" className={`block text-center py-2 rounded-lg font-semibold text-sm transition ${
                  p.popular ? 'bg-[#003366] text-white hover:bg-[#001a33]' : 'bg-white/20 text-white hover:bg-white/30'
                }`}>
                  Empezar
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-white/50 text-sm py-8 border-t border-white/10">
          <p>FinanziaStock Pro © 2026 — Dr. Julián Cucalón</p>
          <p className="mt-1">Inventario + Facturación + Cobranza + Contabilidad con IA</p>
        </footer>
      </main>
    </div>
  );
}
