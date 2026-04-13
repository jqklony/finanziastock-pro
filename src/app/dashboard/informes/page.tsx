export default function InformesPage() {
  const informes = [
    { tipo: "📊 Estado de Resultados", periodo: "Abril 2026", estado: "Listo", fecha: "2026-04-13" },
    { tipo: "📋 Balance General", periodo: "Abril 2026", estado: "Listo", fecha: "2026-04-13" },
    { tipo: "💰 Flujo de Caja", periodo: "Abril 2026", estado: "Listo", fecha: "2026-04-13" },
    { tipo: "📱 Efectividad de Cobro", periodo: "Abril 2026", estado: "Listo", fecha: "2026-04-13" },
    { tipo: "📦 Rotación de Inventario", periodo: "Abril 2026", estado: "Listo", fecha: "2026-04-13" },
    { tipo: "🤖 Predicción Flujo 90 días", periodo: "Abr-Jun 2026", estado: "Generando...", fecha: "-" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">📈 Informes y Reportes con IA</h2>
          <p className="text-gray-500 text-sm">Informes financieros automáticos generados por inteligencia artificial</p>
        </div>
        <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#001a33] transition">📄 Generar informe mensual</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h3 className="font-bold text-[#003366] text-lg mb-4">🤖 Resumen ejecutivo generado por IA — Abril 2026</h3>
        <div className="bg-[#f0f4f8] rounded-xl p-5 text-sm text-gray-700 leading-relaxed">
          <p className="mb-3"><strong>Ventas:</strong> $45.2M este mes (+12% vs marzo). El producto con mayor crecimiento fue Gaseosa caja x24 (+28%). El cliente MiniMarket Express incrementó sus pedidos un 35%.</p>
          <p className="mb-3"><strong>Cartera:</strong> La cartera vencida disminuyó 5% gracias a las secuencias de cobro automáticas por WhatsApp. Sin embargo, Hotel Central acumula $12.3M con 60+ días — se recomienda acuerdo de pago o gestión prejurídica.</p>
          <p className="mb-3"><strong>Inventario:</strong> ⚠️ Azúcar 50kg está en nivel CRÍTICO (3 unidades). Cerveza caja x24 está AGOTADA. La IA recomienda comprar esta semana: Azúcar ($1.4M), Cerveza ($3.2M), Aceite ($2.1M).</p>
          <p><strong>Flujo de caja:</strong> Proyección a 30 días: $28.5M (escenario probable). Si Hotel Central paga, sube a $40.8M. Si no paga nadie nuevo, baja a $18.2M. Suficiente para cubrir gastos fijos ($12M) en cualquier escenario.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b"><h3 className="font-bold text-[#003366]">Informes disponibles</h3></div>
        <div className="divide-y">
          {informes.map((inf, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
              <div>
                <div className="font-medium text-sm">{inf.tipo}</div>
                <div className="text-xs text-gray-500">Periodo: {inf.periodo} | Generado: {inf.fecha}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  inf.estado === "Listo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {inf.estado}
                </span>
                {inf.estado === "Listo" && (
                  <button className="text-xs bg-[#003366] text-white px-3 py-1.5 rounded-lg hover:bg-[#001a33] transition">📥 Descargar PDF</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
