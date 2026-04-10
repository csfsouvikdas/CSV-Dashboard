import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { columnProfiles, sampleRows, filters } = await req.json();

    const prompt = `You are a data analyst. Given column profiles and sample data, write a 3–5 sentence insight paragraph identifying the most interesting pattern, outlier, or trend. Be specific with numbers. Do not use bullet points.

Column Profiles: ${JSON.stringify(columnProfiles)}
Sample Data (20 rows): ${JSON.stringify(sampleRows)}
Current Filters: ${JSON.stringify(filters)}

Insight:`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 500,
        messages: [
          { role: 'user', content: prompt }
        ],
      }),
    });

    const result = await response.json();
    return NextResponse.json({ story: result.content[0].text });
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
