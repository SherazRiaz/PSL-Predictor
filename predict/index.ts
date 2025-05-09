import { createClient } from 'npm:@supabase/supabase-js@2.39.7'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not found in environment variables. Please add it in your Supabase project settings.');
    }

    const { matchData } = await req.json();
    if (!matchData) {
      throw new Error('Match data is required');
    }

    const prompt = `Analyze the following match between ${matchData.team1} and ${matchData.team2}:
      - Venue: ${matchData.venue}
      - Weather: Temperature ${matchData.weather.temperature}°C, Wind ${matchData.weather.windSpeed} km/h
      - Team Forms:
        ${matchData.team1}: ${matchData.team1Stats.form.join(', ')}
        ${matchData.team2}: ${matchData.team2Stats.form.join(', ')}
      
      Provide prediction analysis in this exact JSON format:
      {
        "keyPlayers": {
          "${matchData.team1}": "Player Name (role)",
          "${matchData.team2}": "Player Name (role)"
        },
        "winProbability": {
          "${matchData.team1}": number,
          "${matchData.team2}": number
        },
        "headToHead": {
          "rate": "string",
          "lastMatch": "string"
        },
        "venuePerformance": {
          "${matchData.team1}": number,
          "${matchData.team2}": number
        }
      }`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": req.headers.get("origin") || "",
        "X-Title": "PSL Predictor App"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-2024-07-18",
        messages: [
          {
            role: "system",
            content: "You are a cricket prediction assistant that provides analysis in JSON format only. Do not include any additional text or formatting in your response."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenRouter API request failed: ${response.status} - ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Prediction error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})