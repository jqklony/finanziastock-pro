"use client";
const movimientos = [
  { fecha: "2026-04-13", desc: "Depósito Bancolombia", monto: 4250000, tipo: "crédito", clasificacion: "1305 - Clientes", confianza: 95, conciliado: true },
  { fecha: "2026-04-12", desc: "Pago proveedor Arroz", monto: -3120000, tipo: "débito", clasificacion: "2205 - Proveedores", confianza: 92, conciliado: true },
  { fecha: "2026-04-12", desc: "Transferencia Nequi", monto: 890000, tipo: "crédito", clasificacion: "1305 - Clientes", confianza: 88, conciliado: false },
  { fecha: "2026-04-11", desc: "Pago arriendo bodega", monto: -2500000, tipo: "débito", clasificacion: "5120 - Arrendamientos", confianza: 97, conciliado: true },
  { fecha: "2026-04-11", desc: "Servicios públicos EPM", monto: -450000, tipo: "débito", clasificacion: "5135 - Servicios", confianza: 94, conciliado: true },
  { fecha: "2026-04-10", desc: "Depósito desconocido", monto: 1200000, tipo: "crédito", clasificacion: "Pendiente", confianza: 0, conciliado: false },
];

export default function ContabilidadPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">📊 Contabilidad con IA</h2>
          <p className="text-gray-500 text-sm">Conciliación bancaria automática, estados financieros en tiempo real</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#001a33] transition">🏦 Sincronizar banco</button>
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">📄 Estados financieros</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Saldo bancario</div><div className="text-2xl font-bold text-[#003366]">$28.5M</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Movimientos hoy</div><div className="text-2xl font-bold text-[#0078B4]">12</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Por conciliar</div><div className="text-2xl font-bold text-[#e9c46a]">3</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">IVA por pagar</div><div className="text-2xl font-bold text-[#e63946]">$4.2M</div></div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#003366] text-white rounded-xl p-5">
          <div className="text-sm opacity-70">Activos totales</div>
          <div className="text-3xl font-bold mt-1">$245.8M</div>
          <div className="text-sm text-green-300 mt-1">↑ +3.2% vs mes anterior</div>
        </div>
        <div className="bg-[#0078B4] text-white rounded-xl p-5">
          <div className="text-sm opacity-70">Ventas del mes</div>
          <div className="text-3xl font-bold mt-1">$45.2M</div>
          <div className="text-sm text-green-300 mt-1">↑ +12% vs mes anterior</div>
        </div>
        <div className="bg-[#2a9d8f] text-white rounded-xl p-5">
          <div className="text-sm opacity-70">Utilidad neta</div>
          <div className="text-3xl font-bold mt-1">$8.7M</div>
          <div className="text-sm text-green-300 mt-1">Margen: 19.2%</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-[#003366]">Conciliación Bancaria — Clasificación IA</h3>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">4/6 conciliados automáticamente</span>
        </div>
        <table className="w-full">
          <thead><tr className="text-xs text-gray-500 border-b bg-gray-50">
            <th className="text-left p-3">Fecha</th><th className="text-left p-3">Descripción</th><th className="text-right p-3">Monto</th>
            <th className="text-left p-3">Clasificación IA</th><th className="text-center p-3">Confianza</th><th className="text-center p-3">Estado</th>
          </tr></thead>
          <tbody>{movimientos.map((m,i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3 text-sm text-gray-500">{m.fecha}</td>
              <td className="p-3 text-sm">{m.desc}</td>
              <td className={`p-3 text-sm text-right font-semibold ${m.monto>=0?"text-green-600":"text-red-600"}`}>
                {m.monto>=0?"+":""}${Math.abs(m.monto).toLocaleString()}
              </td>
              <td className="p-3 text-sm">{m.clasificacion==="Pendiente"?
                <span className="text-orange-500 font-medium">⚠️ Pendiente clasificar</span>:
                <span className="text-[#003366]">{m.clasificacion}</span>}
              </td>
              <td className="p-3 text-center">
                {m.confianza>0?<span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  m.confianza>=90?"bg-green-100 text-green-700":m.confianza>=70?"bg-yellow-100 text-yellow-700":"bg-red-100 text-red-700"}`}>{m.confianza}%</span>:
                <span className="text-gray-400 text-xs">-</span>}
              </td>
              <td className="p-3 text-center">
                {m.conciliado?<span className="text-xs text-green-600">✅</span>:
                <button className="text-xs bg-[#003366] text-white px-3 py-1 rounded-lg hover:bg-[#001a33]">Conciliar</button>}
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
