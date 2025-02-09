import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createHmac } from 'https://deno.land/std@0.168.0/crypto/mod.ts'

const CHATBASE_SECRET = Deno.env.get('CHATBASE_SECRET')

serve(async (req) => {
  try {
    // Verify request method
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    // Get request body
    const { userId } = await req.json()
    
    if (!userId) {
      return new Response('Missing userId', { status: 400 })
    }

    if (!CHATBASE_SECRET) {
      return new Response('Server configuration error', { status: 500 })
    }

    // Generate HMAC
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(CHATBASE_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )

    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      new TextEncoder().encode(userId)
    )

    const hash = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    return new Response(
      JSON.stringify({ hash }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error generating hash:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})