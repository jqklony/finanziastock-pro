"use client";
export default function ConfigPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[#003366] mb-6">⚙️ Configuración</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-bold text-[#003366] mb-4">🏢 Datos de la empresa</h3>
          <div className="space-y-3">
            <div><label className="text-sm text-gray-500">NIT</label><input className="w-full border rounded-lg py-2 px-3 text-sm mt-1" defaultValue="900123456-7" /></div>
            <div><label className="text-sm text-gray-500">Razón social</label><input className="w-full border rounded-lg py-2 px-3 text-sm mt-1" defaultValue="Distribuidora Demo S.A.S." /></div>
            <div><label className="text-sm text-gray-500">Sector</label><input className="w-full border rounded-lg py-2 px-3 text-sm mt-1" defaultValue="Distribución Mayorista" /></div>
            <div><label className="text-sm text-gray-500">Ciudad</label><input className="w-full border rounded-lg py-2 px-3 text-sm mt-1" defaultValue="Popayán, Cauca" /></div>
            <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm mt-2">Guardar cambios</button>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-bold text-[#003366] mb-4">🔗 Integraciones</h3>
          <div className="space-y-3">
            {[
              { name: "Bancolombia (Belvo)", status: "Conectado", color: "green" },
              { name: "WhatsApp Business (Twilio)", status: "Conectado", color: "green" },
              { name: "Wompi (Pagos)", status: "Conectado", color: "green" },
              { name: "DIAN (Factus)", status: "Pendiente", color: "yellow" },
              { name: "Google Sheets", status: "No conectado", color: "gray" },
            ].map((int, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{int.name}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${int.color}-100 text-${int.color}-700`}>{int.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-bold text-[#003366] mb-4">👤 Mi cuenta</h3>
          <div className="space-y-3">
            <div><label className="text-sm text-gray-500">Nombre</label><input className="w-full border rounded-lg py-2 px-3 text-sm mt-1" defaultValue="Dr. Julián Cucalón" /></div>
            <div><label className="text-sm text-gray-500">Email</label><input className="w-full border rounded-lg py-2 px-3 text-sm mt-1" defaultValue="jqklony@gmail.com" /></div>
            <div><label className="text-sm text-gray-500">Rol</label><input className="w-full border rounded-lg py-2 px-3 text-sm mt-1 bg-gray-50" defaultValue="Administrador" disabled /></div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="font-bold text-[#003366] mb-4">💳 Plan actual</h3>
          <div className="bg-[#003366] text-white rounded-xl p-5 mb-4">
            <div className="text-sm opacity-70">Plan actual</div>
            <div className="text-2xl font-bold">Negocio</div>
            <div className="text-sm opacity-70 mt-1">$380,000 COP/mes</div>
          </div>
          <p className="text-sm text-gray-500 mb-3">Próximo cobro: 13 de mayo, 2026</p>
          <button className="bg-[#e63946] text-white px-4 py-2 rounded-lg text-sm w-full">Cambiar plan</button>
        </div>
      </div>
    </div>
  );
}
