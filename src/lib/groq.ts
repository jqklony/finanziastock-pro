/**
 * Groq AI Service - Free alternative to OpenAI
 * Uses Llama 3.1 70B model (free, 30 requests/min)
 */
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Classify a bank transaction into a PUC accounting category
 */
export async function classifyTransaction(description: string, amount: number): Promise<{
  account: string;
  category: string;
  confidence: number;
}> {
  const prompt = `Eres un contador colombiano experto. Clasifica esta transacción bancaria en una cuenta del PUC (Plan Único de Cuentas colombiano).

Transacción: "${description}"
Monto: $${amount.toLocaleString()} COP
Tipo: ${amount >= 0 ? 'CRÉDITO (ingreso)' : 'DÉBITO (gasto)'}

Responde SOLO en este formato JSON exacto, sin explicaciones adicionales:
{"account": "CÓDIGO PUC - Nombre", "category": "categoría general", "confidence": número entre 0 y 100}

Ejemplos de cuentas PUC:
- 1105 - Caja
- 1110 - Bancos
- 1305 - Clientes (cuentas por cobrar)
- 2205 - Proveedores nacionales
- 4135 - Comercio al por mayor
- 5105 - Gastos de personal
- 5120 - Arrendamientos
- 5135 - Servicios
- 5195 - Diversos`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.1,
      max_tokens: 200,
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0]?.message?.content;
    if (response) {
      return JSON.parse(response);
    }
  } catch (error) {
    console.error('Groq classification error:', error);
  }

  return { account: 'Pendiente', category: 'Sin clasificar', confidence: 0 };
}

/**
 * Generate an executive summary of the business
 */
export async function generateExecutiveSummary(data: {
  ventas: number;
  ventasAnterior: number;
  carteraVencida: number;
  stockCritico: string[];
  topDeudores: { nombre: string; monto: number }[];
}): Promise<string> {
  const prompt = `Eres el asistente financiero de una empresa colombiana. Genera un resumen ejecutivo breve (máximo 4 párrafos) en español, basándote en estos datos:

- Ventas del mes: $${data.ventas.toLocaleString()} COP
- Ventas mes anterior: $${data.ventasAnterior.toLocaleString()} COP
- Cartera vencida total: $${data.carteraVencida.toLocaleString()} COP
- Productos con stock crítico: ${data.stockCritico.join(', ') || 'Ninguno'}
- Top deudores: ${data.topDeudores.map(d => `${d.nombre} ($${d.monto.toLocaleString()})`).join(', ')}

Incluye: análisis de ventas, estado de cartera, alertas de inventario, y recomendación principal del día. Usa lenguaje profesional pero entendible para un empresario no financiero.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.3,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || 'No se pudo generar el resumen.';
  } catch (error) {
    console.error('Groq summary error:', error);
    return 'Error generando resumen. Intente de nuevo.';
  }
}

/**
 * Answer a business question (chatbot)
 */
export async function askBusinessQuestion(
  question: string,
  context: string
): Promise<string> {
  const prompt = `Eres el asistente financiero de FinanziaStock Pro, una plataforma de gestión empresarial para PYMES colombianas. 

Contexto de la empresa:
${context}

Pregunta del usuario: ${question}

Responde en español, de forma concisa y útil. Si la pregunta requiere datos que no tienes, indica qué datos necesitas. Usa formato con viñetas si es una lista.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.3,
      max_tokens: 400,
    });

    return completion.choices[0]?.message?.content || 'No pude procesar tu pregunta.';
  } catch (error) {
    console.error('Groq chatbot error:', error);
    return 'Error procesando la pregunta. Intente de nuevo.';
  }
}
