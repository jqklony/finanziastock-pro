"use client";

import { useState, useEffect } from "react";
// Importar funciones o lógica para leer desde Prisma/API
// Como estamos en un Client Component, haremos fetch a nuestra nueva API

interface Producto {
  id: string;
  sku: string;
  nombre: string;
  stockActual: number;
  stockMinimo: number;
  precioVenta: number;
  costoPromedio: number;
  puntoReorden?: number | null;
}

export default function InventarioPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const res = await fetch("/api/productos");
        const data = await res.json();
        setProductos(data || []);
      } catch (error) {
        console.error("Error cargando productos", error);
      } finally {
        setCargando(false);
      }
    }
    cargarProductos();
  }, []);

  const filtered = productos.filter(p => 
    p.nombre.toLowerCase().includes(buscar.toLowerCase()) || 
    p.sku.toLowerCase().includes(buscar.toLowerCase())
  );
  
  const valorTotal = productos.reduce((s, p) => s + (p.stockActual * p.costoPromedio), 0);
  const stockBajos = productos.filter(p => p.stockActual <= p.stockMinimo && p.stockActual > 0).length;
  const agotados = productos.filter(p => p.stockActual === 0).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">📦 Inventario Inteligente</h2>
          <p className="text-gray-500 text-sm">Control de stock en tiempo real con predicción de demanda IA</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#001a33] transition shadow-md">+ Nuevo producto</button>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition shadow-sm">📥 Importar Excel</button>
        </div>
      </div>

      {cargando ? (
         <div className="text-center py-10">Cargando inventario...</div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-[#003366] transition">
              <div className="text-sm text-gray-500 font-medium">Total productos</div>
              <div className="text-2xl font-bold text-[#003366] mt-1">{productos.length}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-[#003366] transition">
              <div className="text-sm text-gray-500 font-medium">Valor inventario</div>
              <div className="text-2xl font-bold text-[#003366] mt-1">${(valorTotal/1e6).toFixed(1)}M</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200 hover:border-yellow-400 transition">
              <div className="text-sm text-gray-500 font-medium">Stock bajo</div>
              <div className="text-2xl font-bold text-[#e9c46a] mt-1">{stockBajos}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-red-200 hover:border-red-400 transition">
              <div className="text-sm text-gray-500 font-medium">Agotados</div>
              <div className="text-2xl font-bold text-[#e63946] mt-1">{agotados}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <input type="text" placeholder="Buscar producto por nombre o SKU..." value={buscar} onChange={e=>setBuscar(e.target.value)}
                className="w-1/3 border border-gray-300 rounded-lg py-2 px-3 text-sm focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none transition shadow-inner" />
              <button className="text-sm text-[#003366] font-semibold hover:underline">Exportar CSV</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="text-xs text-gray-500 border-b border-gray-200 bg-gray-50/50 uppercase">
                  <th className="p-4 font-semibold tracking-wide">SKU</th>
                  <th className="p-4 font-semibold tracking-wide">Producto</th>
                  <th className="text-right p-4 font-semibold tracking-wide">Stock</th>
                  <th className="text-right p-4 font-semibold tracking-wide">Mínimo</th>
                  <th className="text-right p-4 font-semibold tracking-wide">Reorden IA</th>
                  <th className="text-right p-4 font-semibold tracking-wide">Precio</th>
                  <th className="text-right p-4 font-semibold tracking-wide">Costo</th>
                  <th className="text-center p-4 font-semibold tracking-wide">Estado</th>
                </tr></thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={8} className="p-8 text-center text-gray-500">No se encontraron productos.</td></tr>
                  ) : filtered.map((p) => {
                    let estado = "ok";
                    if (p.stockActual === 0) estado = "agotado";
                    else if (p.stockActual <= p.stockMinimo) estado = "bajo";
                    
                    return (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition">
                        <td className="p-4 text-sm font-mono text-gray-500">{p.sku}</td>
                        <td className="p-4 text-sm font-semibold text-gray-800">{p.nombre}</td>
                        <td className="p-4 text-sm text-right font-bold text-[#003366]">{p.stockActual}</td>
                        <td className="p-4 text-sm text-right text-gray-500">{p.stockMinimo}</td>
                        <td className="p-4 text-sm text-right text-[#0078B4] font-bold bg-blue-50/50 rounded-md">
                          {p.puntoReorden ? p.puntoReorden : '-'}
                        </td>
                        <td className="p-4 text-sm text-right">${p.precioVenta.toLocaleString()}</td>
                        <td className="p-4 text-sm text-right text-gray-500">${p.costoPromedio.toLocaleString()}</td>
                        <td className="p-4 text-center">
                          <span className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block min-w-[80px] shadow-sm ${
                            estado==="ok" ? "bg-green-100 text-green-700 border border-green-200" :
                            estado==="bajo" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
                            "bg-red-100 text-red-700 border border-red-200"}`}>
                            {estado==="ok"?"✅ OK":estado==="bajo"?"⚠️ Bajo":"❌ Agotado"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
