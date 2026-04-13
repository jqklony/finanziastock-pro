/**
 * WhatsApp Service using Baileys (free, unlimited)
 * 
 * HOW TO USE:
 * 1. Run: npx ts-node src/lib/whatsapp.ts
 * 2. Scan QR code with your WhatsApp app
 * 3. Once connected, the service can send messages
 * 
 * For the web app, this runs as a separate process (not inside Next.js)
 * The web app communicates with it via API calls to a local server.
 */

import makeWASocket, { 
  DisconnectReason, 
  useMultiFileAuthState,
  WASocket 
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import * as path from 'path';

const AUTH_DIR = path.join(process.cwd(), 'data', 'whatsapp-auth');

let sock: WASocket | null = null;

export async function connectWhatsApp(): Promise<WASocket> {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true, // Shows QR in terminal for first-time scan
  });

  sock.ev.on('creds.update', saveCreds);
  
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === 'close') {
      const shouldReconnect = 
        (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      
      console.log('Connection closed. Reconnecting:', shouldReconnect);
      if (shouldReconnect) {
        connectWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('✅ WhatsApp connected successfully!');
    }
  });

  return sock;
}

/**
 * Send a text message
 * @param phone - Phone number with country code (e.g., "573001234567")
 * @param message - Text message to send
 */
export async function sendMessage(phone: string, message: string): Promise<boolean> {
  if (!sock) {
    console.error('WhatsApp not connected. Call connectWhatsApp() first.');
    return false;
  }
  
  try {
    // Format phone number: remove +, spaces, dashes
    const formatted = phone.replace(/[\s\-\+]/g, '');
    const jid = `${formatted}@s.whatsapp.net`;
    
    await sock.sendMessage(jid, { text: message });
    console.log(`✅ Message sent to ${phone}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send message to ${phone}:`, error);
    return false;
  }
}

/**
 * Send a payment reminder with link
 */
export async function sendPaymentReminder(
  phone: string, 
  clientName: string, 
  amount: number, 
  invoiceNumber: string,
  paymentLink?: string
): Promise<boolean> {
  const amountFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(amount);
  
  let message = `Hola ${clientName},\n\n`;
  message += `Le recordamos que tiene una factura pendiente:\n\n`;
  message += `📄 Factura: ${invoiceNumber}\n`;
  message += `💰 Monto: ${amountFormatted}\n\n`;
  
  if (paymentLink) {
    message += `Puede pagar fácilmente aquí:\n${paymentLink}\n\n`;
  }
  
  message += `Gracias por su preferencia.\n`;
  message += `— FinanziaStock Pro`;
  
  return sendMessage(phone, message);
}

/**
 * Send invoice notification
 */
export async function sendInvoiceNotification(
  phone: string,
  clientName: string,
  invoiceNumber: string,
  amount: number,
  dueDate: string
): Promise<boolean> {
  const amountFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(amount);
  
  let message = `Hola ${clientName},\n\n`;
  message += `Se ha generado una nueva factura:\n\n`;
  message += `📄 Número: ${invoiceNumber}\n`;
  message += `💰 Total: ${amountFormatted}\n`;
  message += `📅 Vence: ${dueDate}\n\n`;
  message += `Gracias por su confianza.\n`;
  message += `— FinanziaStock Pro`;
  
  return sendMessage(phone, message);
}

/**
 * Send stock alert
 */
export async function sendStockAlert(
  phone: string,
  productName: string,
  currentStock: number,
  minimumStock: number
): Promise<boolean> {
  let message = `⚠️ ALERTA DE INVENTARIO\n\n`;
  message += `El producto *${productName}* está en nivel crítico:\n\n`;
  message += `📦 Stock actual: ${currentStock} unidades\n`;
  message += `📉 Mínimo requerido: ${minimumStock} unidades\n\n`;
  message += `Se recomienda generar orden de compra inmediatamente.\n`;
  message += `— FinanziaStock Pro`;
  
  return sendMessage(phone, message);
}

// Run standalone for QR code scanning
if (require.main === module) {
  console.log('🔄 Connecting to WhatsApp...');
  console.log('📱 Scan the QR code with your WhatsApp app');
  connectWhatsApp();
}
