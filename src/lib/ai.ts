/**
 * AI service — uses Google Gemini (FREE) + OpenAI (optional) + fallback.
 * 
 * 1. Google Gemini (FREE) — if GEMINI_API_KEY is set (get from Google AI Studio)
 * 2. OpenAI (optional) — if OPENAI_API_KEY is set
 * 3. z-ai SDK (local sandbox only)
 * 4. Fallback — always works
 * 
 * Get your FREE Gemini API key: https://aistudio.google.com/app/apikey
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const GEMINI_MODEL = 'gemini-1.5-flash'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o'

const IS_VERCEL = !!process.env.VERCEL

// ============================================
// 1. Google Gemini (FREE — 1500 requests/day)
// ============================================
async function geminiChat(
  messages: Array<{ role: string; content: string }>,
  system?: string
): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('No Gemini key')

  // Convert messages to Gemini format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const body: any = {
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2000,
    },
  }

  if (system) {
    body.systemInstruction = { parts: [{ text: system }] }
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini ${res.status}: ${err.slice(0, 100)}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
}

async function geminiVision(
  prompt: string,
  imageDataUrl: string,
  system?: string
): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('No Gemini key')

  // Extract base64 from data URL
  const base64Match = imageDataUrl.match(/^data:image\/(\w+);base64,(.+)$/)
  if (!base64Match) throw new Error('Invalid image format')
  const mimeType = `image/${base64Match[1]}`
  const base64Data = base64Match[2]

  const body: any = {
    contents: [{
      role: 'user',
      parts: [
        { text: prompt },
        { inlineData: { mimeType, data: base64Data } },
      ],
    }],
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 1000,
    },
  }

  if (system) {
    body.systemInstruction = { parts: [{ text: system }] }
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) throw new Error(`Gemini Vision ${res.status}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
}

// ============================================
// 2. OpenAI (optional, paid)
// ============================================
async function openaiChat(
  messages: Array<{ role: string; content: string }>,
  system?: string
): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error('No OpenAI key')

  const allMessages = system
    ? [{ role: 'system', content: system }, ...messages]
    : messages

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: allMessages,
      max_tokens: 2000,
      temperature: 0.7,
    }),
  })

  if (!res.ok) throw new Error(`OpenAI ${res.status}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

async function openaiVision(
  prompt: string,
  imageDataUrl: string,
  system?: string
): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error('No OpenAI key')

  const messages = [
    ...(system ? [{ role: 'system', content: system }] : []),
    {
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: imageDataUrl } },
      ],
    },
  ]

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      max_tokens: 1000,
      temperature: 0.5,
    }),
  })

  if (!res.ok) throw new Error(`OpenAI Vision ${res.status}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

// ============================================
// 3. z-ai SDK (local sandbox only)
// ============================================
async function zaiChat(
  messages: Array<{ role: string; content: string }>,
  system?: string
): Promise<string> {
  if (IS_VERCEL) throw new Error('Skip z-ai on Vercel')
  const ZAIModule = await import('z-ai-web-dev-sdk')
  const ZAI = ZAIModule.default
  const zai = await ZAI.create()
  const completion = await zai.chat.completions.create({
    messages: system ? [{ role: 'system', content: system }, ...messages] : messages,
    thinking: { type: 'disabled' },
  })
  return completion.choices?.[0]?.message?.content ?? ''
}

async function zaiVision(
  prompt: string,
  imageDataUrl: string,
  system?: string
): Promise<string> {
  if (IS_VERCEL) throw new Error('Skip z-ai on Vercel')
  const ZAIModule = await import('z-ai-web-dev-sdk')
  const ZAI = ZAIModule.default
  const zai = await ZAI.create()
  const response = await zai.chat.completions.createVision({
    messages: [
      ...(system ? [{ role: 'system', content: system }] : []),
      { role: 'user', content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: imageDataUrl } },
      ]},
    ],
    thinking: { type: 'disabled' },
  })
  return response.choices?.[0]?.message?.content ?? ''
}

// ============================================
// EXPORTS — tries Gemini → OpenAI → z-ai → fallback
// ============================================
export async function chatComplete(
  messages: Array<{ role: string; content: string }>,
  system?: string
): Promise<string> {
  // 1. Google Gemini (FREE)
  if (GEMINI_API_KEY) {
    try {
      const result = await geminiChat(messages, system)
      if (result && result.trim()) return result
    } catch {}
  }

  // 2. OpenAI (paid, optional)
  if (OPENAI_API_KEY) {
    try {
      const result = await openaiChat(messages, system)
      if (result && result.trim()) return result
    } catch {}
  }

  // 3. z-ai SDK (local sandbox)
  if (!IS_VERCEL) {
    try {
      const result = await zaiChat(messages, system)
      if (result && result.trim()) return result
    } catch {}
  }

  // 4. All failed — caller uses fallback
  throw new Error('AI unavailable')
}

export async function visionComplete(
  prompt: string,
  imageDataUrl: string,
  system?: string
): Promise<string> {
  // 1. Google Gemini Vision (FREE)
  if (GEMINI_API_KEY) {
    try {
      const result = await geminiVision(prompt, imageDataUrl, system)
      if (result && result.trim()) return result
    } catch {}
  }

  // 2. OpenAI Vision (paid)
  if (OPENAI_API_KEY) {
    try {
      const result = await openaiVision(prompt, imageDataUrl, system)
      if (result && result.trim()) return result
    } catch {}
  }

  // 3. z-ai SDK (local)
  if (!IS_VERCEL) {
    try {
      const result = await zaiVision(prompt, imageDataUrl, system)
      if (result && result.trim()) return result
    } catch {}
  }

  // 4. All failed
  throw new Error('AI vision unavailable')
}
