import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { description, amount } = await request.json();

    const prompt = `Clasifica esta transacción bancaria colombiana en una cuenta del PUC.

Transacción: "${description}"
Monto: $${amount?.toLocaleString()} COP
Tipo: ${amount >= 0 ? 'CRÉDITO' : 'DÉBITO'}

Responde SOLO en JSON: {"account": "CÓDIGO - Nombre", "category": "categoría", "confidence": 0-100}`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.1,
      max_tokens: 150,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Classification error:', error);
    return NextResponse.json({ account: 'Pendiente', category: 'Error', confidence: 0 }, { status: 500 });
  }
}
