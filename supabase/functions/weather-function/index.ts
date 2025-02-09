import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

interface WeatherResponse {
  location: string;
  temperature: number;
  conditions: string;
  timestamp: string;
}

serve(async (req) => {
  try {
    // Get location from request body
    const { location } = await req.json()
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: 'Location is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Mock weather data for demo
    // In production, this would call a real weather API
    const weatherData: WeatherResponse = {
      location,
      temperature: 20 + Math.floor(Math.random() * 10),
      conditions: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
      timestamp: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(weatherData),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=300' // Cache for 5 minutes
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
})