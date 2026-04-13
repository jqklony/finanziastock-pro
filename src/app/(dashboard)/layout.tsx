import Link from "next/link";

const menuItems = [
  { href: "/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/dashboard/inventario", icon: "📦", label: "Inventario" },
  { href: "/dashboard/facturacion", icon: "💰", label: "Facturación" },
  { href: "/dashboard/cobranza", icon: "📋", label: "Cobranza" },
  { href: "/dashboard/contabilidad", icon: "📊", label: "Contabilidad" },
  { href: "/dashboard/informes", icon: "📄", label: "Informes" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#003366] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#003366] font-bold">F</span>
            </div>
            <span className="font-bold">FinanziaStock Pro</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-sm"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-white/50">Empresa Demo S.A.S.</div>
          <div className="text-xs text-white/30">NIT: 900.123.456-7</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[#003366]">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-500 hover:text-gray-700">🔔</button>
            <div className="w-8 h-8 bg-[#003366] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">JC</span>
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
