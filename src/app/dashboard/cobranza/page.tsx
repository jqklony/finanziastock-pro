"use client";
const cartera = [
  { cliente: "Hotel Central", nit: "900456789", total: 12300000, vencido30: 6300000, vencido60: 4200000, vencido90: 1800000, score: 28, segmento: "D" },
  { cliente: "Tienda El Progreso", nit: "900123456", total: 8700000, vencido30: 4250000, vencido60: 3100000, vencido90: 1350000, score: 35, segmento: "C" },
  { cliente: "Restaurante Sabor", nit: "900789012", total: 5600000, vencido30: 2800000, vencido60: 1400000, vencido90: 1400000, score: 62, segmento: "B" },
  { cliente: "Panadería Don Pan", nit: "900345678", total: 3200000, vencido30: 1600000, vencido60: 1600000, vencido90: 0, score: 71, segmento: "B" },
  { cliente: "MiniMarket Express", nit: "900567890", total: 1950000, vencido30: 1950000, vencido60: 0, vencido90: 0, score: 85, segmento: "A" },
  { cliente: "Cafetería Luna", nit: "900234567", total: 890000, vencido30: 890000, vencido60: 0, vencido90: 0, score: 92, segmento: "A" },
];

export default function CobranzaPage() {
  const totalCartera = cartera.reduce((s,c)=>s+c.total,0);
  const totalVencido = cartera.reduce((s,c)=>s+c.vencido60+c.vencido90,0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">📋 Cobranza Inteligente con IA</h2>
          <p className="text-gray-500 text-sm">Scoring de riesgo, cobro automático por WhatsApp, links de pago</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#2a9d8f] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#238b7e] transition">📱 Cobrar por WhatsApp</button>
          <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#001a33] transition">⚙️ Secuencias</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Cartera total</div><div className="text-2xl font-bold text-[#003366]">${(totalCartera/1e6).toFixed(1)}M</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Vencida &gt;60 días</div><div className="text-2xl font-bold text-[#e63946]">${(totalVencido/1e6).toFixed(1)}M</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">DSO (días promedio cobro)</div><div className="text-2xl font-bold text-[#e9c46a]">38 días</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Tasa recuperación</div><div className="text-2xl font-bold text-[#2a9d8f]">76%</div></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b"><h3 className="font-bold text-[#003366]">Cartera por cliente — Ordenada por riesgo (Score IA)</h3></div>
        <table className="w-full">
          <thead><tr className="text-xs text-gray-500 border-b bg-gray-50">
            <th className="text-left p-3">Cliente</th><th className="text-center p-3">Score IA</th><th className="text-center p-3">Segmento</th>
            <th className="text-right p-3">Total</th><th className="text-right p-3">30 días</th><th className="text-right p-3">60 días</th>
            <th className="text-right p-3">90+ días</th><th className="text-center p-3">Acción</th>
          </tr></thead>
          <tbody>{cartera.map((c,i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3"><div className="text-sm font-medium">{c.cliente}</div><div className="text-xs text-gray-400">NIT: {c.nit}</div></td>
              <td className="p-3 text-center">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  c.score>=70?"bg-green-100 text-green-700":c.score>=40?"bg-yellow-100 text-yellow-700":"bg-red-100 text-red-700"}`}>{c.score}</span>
              </td>
              <td className="p-3 text-center"><span className={`text-xs font-bold px-2 py-1 rounded ${
                c.segmento==="A"?"bg-green-600 text-white":c.segmento==="B"?"bg-yellow-500 text-white":
                c.segmento==="C"?"bg-orange-500 text-white":"bg-red-600 text-white"}`}>{c.segmento}</span></td>
              <td className="p-3 text-right text-sm font-semibold">${(c.total/1e6).toFixed(1)}M</td>
              <td className="p-3 text-right text-sm">{c.vencido30>0?`$${(c.vencido30/1e6).toFixed(1)}M`:"-"}</td>
              <td className="p-3 text-right text-sm text-orange-600">{c.vencido60>0?`$${(c.vencido60/1e6).toFixed(1)}M`:"-"}</td>
              <td className="p-3 text-right text-sm text-red-600 font-semibold">{c.vencido90>0?`$${(c.vencido90/1e6).toFixed(1)}M`:"-"}</td>
              <td className="p-3 text-center">
                <button className="text-xs bg-[#2a9d8f] text-white px-3 py-1.5 rounded-lg hover:bg-[#238b7e] transition">📱 Cobrar</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
