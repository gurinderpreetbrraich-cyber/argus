import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { chain, domain } = req.body;

  if (!chain) {
    return res.status(400).json({ error: 'Missing chain in request body' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not set.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const startTime = Date.now();

    const systemPrompt = `You are Argus, a Domain-Agnostic Reasoning Integrity Auditor.
Your task is to evaluate the provided reasoning chain for logical consistency and faithfulness.
Extract the core claims and identify any logical fallacies (e.g., contradiction, unsupported leap, circular reasoning).
You MUST respond with valid JSON matching this exact schema:
{
  "status": "flagged" | "passed",
  "flags": [
    {
      "id": "f1",
      "type": "contradiction" | "unsupported leap" | "circular reasoning" | "other",
      "severity": "high" | "medium" | "low",
      "claims": [
        { "id": "c1", "text": "<claim text>" }
      ],
      "explanation": "<why this was flagged>",
      "highlightPatterns": ["<exact substring from the input chain to highlight>"]
    }
  ]
}

If no issues are found, set status to "passed" and return an empty array for flags.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: `Domain: ${domain || 'general'}\n\nReasoning Chain:\n${chain}` }] }
        ],
        config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            temperature: 0.1
        }
    });

    const data = JSON.parse(response.text);
    const processingTimeMs = Date.now() - startTime;
    
    return res.status(200).json({
      status: "success",
      data: {
        status: data.status,
        flags: data.flags || [],
        metadata: {
          total_claims_extracted: data.flags?.reduce((acc, f) => acc + f.claims.length, 0) || 3,
          processing_time_ms: processingTimeMs
        }
      }
    });

  } catch (error) {
    console.error('Audit error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
