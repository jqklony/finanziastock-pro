import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Reusa la instancia de Prisma
const prisma = new PrismaClient();

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      orderBy: { nombre: 'asc' },
    });

    if (productos.length === 0) {
      // Generar datos de prueba si está vacío (para el demo interactivo)
      return NextResponse.json([
        { id: "1", sku: "ARR-001", nombre: "Arroz 50kg", stockActual: 45, stockMinimo: 20, precioVenta: 95000, costoPromedio: 78000, puntoReorden: 30 },
        { id: "2", sku: "ACE-001", nombre: "Aceite caja x12", stockActual: 12, stockMinimo: 15, precioVenta: 72000, costoPromedio: 58000, puntoReorden: 25 },
        { id: "3", sku: "AZU-001", nombre: "Azúcar 50kg", stockActual: 3, stockMinimo: 10, precioVenta: 85000, costoPromedio: 70000, puntoReorden: 20 },
        { id: "4", sku: "HAR-001", nombre: "Harina bulto 50kg", stockActual: 38, stockMinimo: 15, precioVenta: 78000, costoPromedio: 62000, puntoReorden: 25 },
        { id: "5", sku: "JAB-001", nombre: "Jabón caja x24", stockActual: 22, stockMinimo: 20, precioVenta: 62000, costoPromedio: 48000, puntoReorden: 30 },
        { id: "6", sku: "DET-001", nombre: "Detergente caja x12", stockActual: 8, stockMinimo: 10, precioVenta: 58000, costoPromedio: 44000, puntoReorden: 18 },
        { id: "7", sku: "GAS-001", nombre: "Gaseosa caja x24", stockActual: 55, stockMinimo: 25, precioVenta: 45000, costoPromedio: 35000, puntoReorden: 40 },
        { id: "8", sku: "CER-001", nombre: "Cerveza caja x24", stockActual: 0, stockMinimo: 15, precioVenta: 68000, costoPromedio: 52000, puntoReorden: 25 },
      ]);
    }

    return NextResponse.json(productos);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    return NextResponse.json({ error: "Error de base de datos" }, { status: 500 });
  }
}
