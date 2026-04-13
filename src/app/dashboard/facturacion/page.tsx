"use client";
const facturas = [
  { num: "FE-001", cliente: "Tienda El Progreso", fecha: "2026-04-10", vence: "2026-05-10", total: 4250000, saldo: 4250000, estado: "emitida" },
  { num: "FE-002", cliente: "Restaurante Sabor", fecha: "2026-04-08", vence: "2026-04-23", total: 2800000, saldo: 1400000, estado: "parcial" },
  { num: "FE-003", cliente: "MiniMarket Express", fecha: "2026-04-05", vence: "2026-04-20", total: 1950000, saldo: 0, estado: "pagada" },
  { num: "FE-004", cliente: "Hotel Central", fecha: "2026-03-15", vence: "2026-04-15", total: 6300000, saldo: 6300000, estado: "vencida" },
  { num: "FE-005", cliente: "Cafetería Luna", fecha: "2026-04-12", vence: "2026-05-12", total: 890000, saldo: 890000, estado: "emitida" },
];

export default function FacturacionPage() {
  const totalFacturado = facturas.reduce((s,f)=>s+f.total,0);
  const totalPendiente = facturas.reduce((s,f)=>s+f.saldo,0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">💰 Facturación Electrónica DIAN</h2>
          <p className="text-gray-500 text-sm">Emita facturas electrónicas válidas ante la DIAN</p>
        </div>
        <button className="bg-[#e63946] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#c62828] transition">+ Nueva Factura</button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Facturado este mes</div><div className="text-2xl font-bold text-[#003366]">${(totalFacturado/1e6).toFixed(1)}M</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Pendiente de cobro</div><div className="text-2xl font-bold text-[#e63946]">${(totalPendiente/1e6).toFixed(1)}M</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Facturas emitidas</div><div className="text-2xl font-bold text-[#003366]">{facturas.length}</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Vencidas</div><div className="text-2xl font-bold text-[#e63946]">{facturas.filter(f=>f.estado==="vencida").length}</div></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <table className="w-full">
          <thead><tr className="text-xs text-gray-500 border-b bg-gray-50">
            <th className="text-left p-3">Número</th><th className="text-left p-3">Cliente</th><th className="text-center p-3">Fecha</th>
            <th className="text-center p-3">Vence</th><th className="text-right p-3">Total</th><th className="text-right p-3">Saldo</th>
            <th className="text-center p-3">Estado</th><th className="text-center p-3">Acciones</th>
          </tr></thead>
          <tbody>{facturas.map((f,i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3 text-sm font-mono font-semibold text-[#003366]">{f.num}</td>
              <td className="p-3 text-sm">{f.cliente}</td>
              <td className="p-3 text-sm text-center text-gray-500">{f.fecha}</td>
              <td className="p-3 text-sm text-center text-gray-500">{f.vence}</td>
              <td className="p-3 text-sm text-right font-semibold">${f.total.toLocaleString()}</td>
              <td className="p-3 text-sm text-right font-semibold text-[#e63946]">{f.saldo > 0 ? `$${f.saldo.toLocaleString()}` : "-"}</td>
              <td className="p-3 text-center">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  f.estado==="pagada"?"bg-green-100 text-green-700":
                  f.estado==="emitida"?"bg-blue-100 text-blue-700":
                  f.estado==="parcial"?"bg-yellow-100 text-yellow-700":
                  "bg-red-100 text-red-700"}`}>
                  {f.estado.charAt(0).toUpperCase()+f.estado.slice(1)}
                </span>
              </td>
              <td className="p-3 text-center">
                <button className="text-xs bg-[#003366] text-white px-3 py-1 rounded-lg hover:bg-[#001a33]">📄 Ver</button>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
