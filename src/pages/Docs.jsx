import React from 'react';

const codeExample = `
// POST https://api.argus.dev/v1/audit
// Headers: Authorization: Bearer <API_KEY>

const response = await fetch('https://api.argus.dev/v1/audit', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    chain: "The contract requires a 30-day notice...",
    domain: "legal" // Optional
  })
});

const result = await response.json();
console.log(result);
`.trim();

const responseExample = `
{
  "status": "success",
  "data": {
    "flags": [
      {
        "type": "contradiction",
        "severity": "high",
        "claims": [
          {
            "id": "c2",
            "text": "The contract requires a 30-day notice."
          },
          {
            "id": "c4",
            "text": "Terminating 14 days after notice satisfies the requirement."
          }
        ],
        "explanation": "Claim 4 asserts that a 14-day duration satisfies a condition defined as 30 days in Claim 2."
      }
    ],
    "metadata": {
      "total_claims_extracted": 5,
      "processing_time_ms": 1240
    }
  }
}
`.trim();

export default function Docs() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 lg:px-16 font-body">
      <div className="mb-12">
        <h1 className="animate-fade-rise font-display text-4xl sm:text-5xl font-medium tracking-tight mb-4 text-white">
          API Documentation
        </h1>
        <p className="animate-fade-rise text-lg text-muted-foreground" style={{ animationDelay: '0.2s' }}>
          Integrate Argus's reasoning audit engine into your application.
        </p>
      </div>

      <div className="space-y-12 animate-fade-rise" style={{ animationDelay: '0.4s' }}>
        <section>
          <h2 className="text-2xl font-medium text-white mb-4">Authentication</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Argus API uses Bearer token authentication. You must include your API key in the <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-white/90">Authorization</code> header for all requests.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-white mb-4">Audit Endpoint</h2>
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-blue-500/20 text-blue-400 font-mono text-sm px-2 py-1 rounded">POST</span>
            <code className="font-mono text-white/90">/v1/audit</code>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Submits a reasoning chain text for auditing. The engine decomposes the text, runs consistency and faithfulness checks, and returns any identified logical flags.
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-2 uppercase tracking-wider">Example Request</h3>
            <div className="bg-black/60 border border-white/10 rounded-lg overflow-hidden">
              <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs text-white/50 font-mono">TypeScript / Node.js</div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-white/80 leading-relaxed">
                {codeExample}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white mb-2 uppercase tracking-wider">Response Payload</h3>
            <div className="bg-black/60 border border-white/10 rounded-lg overflow-hidden">
              <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs text-white/50 font-mono">JSON</div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-white/80 leading-relaxed">
                {responseExample}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
