"use client";
import { useState } from "react";

const productos = [
  { sku: "ARR-001", nombre: "Arroz 50kg", stock: 45, minimo: 20, precio: 95000, costo: 78000, reorden: 30, estado: "ok" },
  { sku: "ACE-001", nombre: "Aceite caja x12", stock: 12, minimo: 15, precio: 72000, costo: 58000, reorden: 25, estado: "bajo" },
  { sku: "AZU-001", nombre: "Azúcar 50kg", stock: 3, minimo: 10, precio: 85000, costo: 70000, reorden: 20, estado: "critico" },
  { sku: "HAR-001", nombre: "Harina bulto 50kg", stock: 38, minimo: 15, precio: 78000, costo: 62000, reorden: 25, estado: "ok" },
  { sku: "JAB-001", nombre: "Jabón caja x24", stock: 22, minimo: 20, precio: 62000, costo: 48000, reorden: 30, estado: "ok" },
  { sku: "DET-001", nombre: "Detergente caja x12", stock: 8, minimo: 10, precio: 58000, costo: 44000, reorden: 18, estado: "bajo" },
  { sku: "GAS-001", nombre: "Gaseosa caja x24", stock: 55, minimo: 25, precio: 45000, costo: 35000, reorden: 40, estado: "ok" },
  { sku: "CER-001", nombre: "Cerveza caja x24", stock: 0, minimo: 15, precio: 68000, costo: 52000, reorden: 25, estado: "agotado" },
];

export default function InventarioPage() {
  const [buscar, setBuscar] = useState("");
  const filtered = productos.filter(p => p.nombre.toLowerCase().includes(buscar.toLowerCase()) || p.sku.toLowerCase().includes(buscar.toLowerCase()));
  const valorTotal = productos.reduce((s, p) => s + p.stock * p.costo, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">📦 Inventario Inteligente</h2>
          <p className="text-gray-500 text-sm">Control de stock en tiempo real con predicción de demanda</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#003366] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#001a33] transition">+ Nuevo producto</button>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">📥 Importar Excel</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Total productos</div><div className="text-2xl font-bold text-[#003366]">{productos.length}</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Valor inventario</div><div className="text-2xl font-bold text-[#003366]">${(valorTotal/1e6).toFixed(1)}M</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Stock bajo</div><div className="text-2xl font-bold text-[#e9c46a]">{productos.filter(p=>p.estado==="bajo").length}</div></div>
        <div className="bg-white rounded-xl p-4 shadow-sm border"><div className="text-sm text-gray-500">Agotados</div><div className="text-2xl font-bold text-[#e63946]">{productos.filter(p=>p.estado==="agotado"||p.estado==="critico").length}</div></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <input type="text" placeholder="Buscar producto por nombre o SKU..." value={buscar} onChange={e=>setBuscar(e.target.value)}
            className="w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:border-[#003366] focus:outline-none" />
        </div>
        <table className="w-full">
          <thead><tr className="text-xs text-gray-500 border-b bg-gray-50">
            <th className="text-left p-3">SKU</th><th className="text-left p-3">Producto</th><th className="text-right p-3">Stock</th>
            <th className="text-right p-3">Mínimo</th><th className="text-right p-3">Reorden IA</th>
            <th className="text-right p-3">Precio</th><th className="text-right p-3">Costo</th><th className="text-center p-3">Estado</th>
          </tr></thead>
          <tbody>{filtered.map((p,i) => (
            <tr key={i} className="border-b hover:bg-gray-50 transition">
              <td className="p-3 text-sm font-mono text-gray-500">{p.sku}</td>
              <td className="p-3 text-sm font-medium">{p.nombre}</td>
              <td className="p-3 text-sm text-right font-semibold">{p.stock}</td>
              <td className="p-3 text-sm text-right text-gray-500">{p.minimo}</td>
              <td className="p-3 text-sm text-right text-[#0078B4] font-medium">{p.reorden}</td>
              <td className="p-3 text-sm text-right">${p.precio.toLocaleString()}</td>
              <td className="p-3 text-sm text-right text-gray-500">${p.costo.toLocaleString()}</td>
              <td className="p-3 text-center">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  p.estado==="ok" ? "bg-green-100 text-green-700" :
                  p.estado==="bajo" ? "bg-yellow-100 text-yellow-700" :
                  p.estado==="critico" ? "bg-red-100 text-red-700" :
                  "bg-gray-100 text-gray-700"}`}>
                  {p.estado==="ok"?"✅ OK":p.estado==="bajo"?"⚠️ Bajo":p.estado==="critico"?"🔴 Crítico":"❌ Agotado"}
                </span>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
