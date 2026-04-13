import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  
  // 1. Crear Empresa
  const empresa = await prisma.empresa.upsert({
    where: { nit: '900123456-7' },
    update: {},
    create: {
      nit: '900123456-7',
      nombre: 'Distribuidora Demo S.A.S.',
      sector: 'Distribución Mayorista',
      plan: 'distribuidor',
      activo: true,
    },
  })
  console.log('Empresa creada:', empresa.nombre)

  // 2. Crear Proveedor
  const proveedor = await prisma.proveedor.create({
    data: {
      empresaId: empresa.id,
      nit: '800987654-3',
      nombre: 'Comercializadora Nacional',
    }
  })

  // 3. Crear Productos
  const productosData = [
    { sku: 'ARR-001', nombre: 'Arroz 50kg', stockActual: 45, stockMinimo: 20, puntoReorden: 30, precioVenta: 95000, costoPromedio: 78000, categoria: 'Granos' },
    { sku: 'ACE-001', nombre: 'Aceite caja x12', stockActual: 12, stockMinimo: 15, puntoReorden: 25, precioVenta: 72000, costoPromedio: 58000, categoria: 'Abarrotes' },
    { sku: 'AZU-001', nombre: 'Azúcar 50kg', stockActual: 3, stockMinimo: 10, puntoReorden: 20, precioVenta: 85000, costoPromedio: 70000, categoria: 'Granos' },
    { sku: 'HAR-001', nombre: 'Harina bulto 50kg', stockActual: 38, stockMinimo: 15, puntoReorden: 25, precioVenta: 78000, costoPromedio: 62000, categoria: 'Abarrotes' },
    { sku: 'JAB-001', nombre: 'Jabón caja x24', stockActual: 22, stockMinimo: 20, puntoReorden: 30, precioVenta: 62000, costoPromedio: 48000, categoria: 'Aseo' },
    { sku: 'CER-001', nombre: "Cerveza caja x24", stockActual: 0, stockMinimo: 15, puntoReorden: 25, precioVenta: 68000, costoPromedio: 52000, categoria: 'Licores' }
  ]

  for (const p of productosData) {
    await prisma.producto.upsert({
      where: { empresaId_sku: { empresaId: empresa.id, sku: p.sku } },
      update: { stockActual: p.stockActual, precioVenta: p.precioVenta },
      create: {
        empresaId: empresa.id,
        proveedorId: proveedor.id,
        ...p
      }
    })
  }
  console.log('Productos creados')
  
  // 4. Crear Cliente
  const cliente = await prisma.cliente.upsert({
    where: { empresaId_nitCliente: { empresaId: empresa.id, nitCliente: '10123456' } },
    update: {},
    create: {
      empresaId: empresa.id,
      nitCliente: '10123456',
      nombre: 'Hotel Central',
      segmento: 'D',
      scoringRiesgo: 28,
    }
  })
  
  // 5. Facturas (Cobranza)
  await prisma.factura.create({
    data: {
      empresaId: empresa.id,
      clienteId: cliente.id,
      numero: 'FE-004',
      fecha: new Date('2026-03-15'),
      fechaVence: new Date('2026-04-15'),
      subtotal: 6300000,
      total: 6300000,
      saldo: 6300000,
      estado: 'vencida'
    }
  })

  console.log('Database seed completed')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
