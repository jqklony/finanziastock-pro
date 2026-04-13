import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { question, context } = await request.json();
    
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const prompt = `Eres el asistente financiero de FinanziaStock Pro para PYMES colombianas.

Contexto: ${context || 'No hay contexto adicional disponible.'}

Pregunta: ${question}

Responde en español, conciso y útil. Usa viñetas si es una lista. Máximo 200 palabras.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.3,
      max_tokens: 400,
    });

    const answer = completion.choices[0]?.message?.content || 'No pude procesar tu pregunta.';
    
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('AI Chat error:', error);
    return NextResponse.json({ error: 'Error procesando la pregunta' }, { status: 500 });
  }
}
