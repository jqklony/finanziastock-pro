export default function DashboardPage() {
  const metrics = [
    { label: "Ventas del mes", value: "$45.2M", change: "+12%", color: "text-green-600" },
    { label: "Cartera vencida", value: "$8.7M", change: "-5%", color: "text-green-600" },
    { label: "Stock valorizado", value: "$123M", change: "+3%", color: "text-blue-600" },
    { label: "Flujo caja 30d", value: "$28.5M", change: "Proyectado", color: "text-purple-600" },
  ];

  const alertas = [
    { tipo: "🔴", msg: "Stock crítico: Arroz 50kg (3 unidades en Bodega Norte)" },
    { tipo: "🟡", msg: "Cliente CLI-045 tiene $4.2M vencidos a 60 días" },
    { tipo: "🟢", msg: "Conciliación bancaria completada: 47 movimientos clasificados" },
    { tipo: "🔵", msg: "Predicción: necesita comprar aceite esta semana ($8.5M)" },
  ];

  const topDeudores = [
    { cliente: "Tienda El Progreso", monto: "$12.3M", dias: 45, score: 35 },
    { cliente: "Restaurante Sabor", monto: "$8.7M", dias: 30, score: 62 },
    { cliente: "MiniMarket Express", monto: "$6.2M", dias: 15, score: 85 },
    { cliente: "Hotel Central", monto: "$4.8M", dias: 60, score: 28 },
    { cliente: "Cafetería Luna", monto: "$3.1M", dias: 7, score: 92 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">La salud de tu negocio HOY</h2>
          <p className="text-gray-500 text-sm">Última actualización: hace 5 minutos</p>
        </div>
        <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#001a33] transition">
          Generar informe mensual
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">{m.label}</div>
            <div className="text-2xl font-bold text-[#003366]">{m.value}</div>
            <div className={`text-sm font-semibold mt-1 ${m.color}`}>{m.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Alertas IA */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold text-[#003366] mb-4">🤖 Alertas de IA</h3>
          <div className="space-y-3">
            {alertas.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">{a.tipo}</span>
                <span className="text-sm text-gray-700">{a.msg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top deudores */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold text-[#003366] mb-4">💳 Top 5 cartera pendiente</h3>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="text-left pb-2">Cliente</th>
                <th className="text-right pb-2">Monto</th>
                <th className="text-right pb-2">Días</th>
                <th className="text-right pb-2">Score IA</th>
              </tr>
            </thead>
            <tbody>
              {topDeudores.map((d, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2 text-sm">{d.cliente}</td>
                  <td className="py-2 text-sm text-right font-semibold">{d.monto}</td>
                  <td className="py-2 text-sm text-right">{d.dias}d</td>
                  <td className="py-2 text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      d.score >= 70 ? 'bg-green-100 text-green-700' :
                      d.score >= 40 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {d.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { icon: "📄", label: "Nueva factura", href: "/dashboard/facturacion" },
          { icon: "📦", label: "Ver inventario", href: "/dashboard/inventario" },
          { icon: "📋", label: "Cobrar ahora", href: "/dashboard/cobranza" },
          { icon: "🏦", label: "Conciliar banco", href: "/dashboard/contabilidad" },
          { icon: "📊", label: "Ver informes", href: "/dashboard/informes" },
          { icon: "⚙️", label: "Configuración", href: "/dashboard/configuracion" },
        ].map((a, i) => (
          <a key={i} href={a.href} className="bg-white rounded-xl p-4 text-center shadow-sm border hover:shadow-md transition">
            <div className="text-2xl mb-1">{a.icon}</div>
            <div className="text-xs text-gray-600">{a.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
