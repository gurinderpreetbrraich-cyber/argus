import React from 'react';
import { Code, Terminal, Zap, BookOpen } from 'lucide-react';

export default function Docs() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 lg:px-16 font-body">
      <div className="mb-12">
        <h1 className="animate-fade-rise font-display text-5xl md:text-6xl font-medium tracking-tight mb-4">
          API Quickstart
        </h1>
        <p className="animate-fade-rise text-lg text-muted-foreground max-w-2xl leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Integrate the Argus auditing pipeline directly into your evaluation loops or production inference paths via our REST API.
        </p>
      </div>

      <div className="animate-fade-rise space-y-12" style={{ animationDelay: '0.4s' }}>
        
        {/* Authentication Section */}
        <section>
          <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-white/50" />
            Authentication
          </h2>
          <p className="text-sm text-white/70 mb-4 leading-relaxed">
            All API requests must be authenticated using a Bearer token in the Authorization header. You can generate an API key in your dashboard.
          </p>
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-white/80">
              <code>Authorization: Bearer argus_live_xxxxxxxxxxxxx</code>
            </pre>
          </div>
        </section>

        {/* Audit Endpoint Section */}
        <section>
          <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-white/50" />
            Run an Audit
          </h2>
          <p className="text-sm text-white/70 mb-4 leading-relaxed">
            The primary endpoint for evaluating a reasoning chain. Provide the raw text output from your LLM, and optionally specify a domain lens to calibrate severity.
          </p>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">POST</span>
              <code className="text-sm text-white font-mono">https://api.argus.dev/v1/audit</code>
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
              <Code className="w-4 h-4 text-white/40" />
              <span className="text-xs text-white/50 font-medium">cURL Example</span>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-white/80">
                <code>{`curl -X POST https://api.argus.dev/v1/audit \\
  -H "Authorization: Bearer argus_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "chain": "Patient presents with acute hypotension. Administering Drug X to lower blood pressure.",
    "domain": "medical"
  }'`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Response Structure */}
        <section>
          <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-white/50" />
            Response Schema
          </h2>
          <p className="text-sm text-white/70 mb-4 leading-relaxed">
            The API returns a structured JSON object containing a `status` (passed or flagged) and a list of detected logical fallacies, if any.
          </p>
          
          <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 overflow-x-auto">
              <pre className="text-sm font-mono text-white/80">
                <code>{`{
  "status": "flagged",
  "data": {
    "flags": [
      {
        "id": "flg_1a2b3c",
        "type": "contradiction",
        "severity": "high",
        "explanation": "Claim 1 states the patient has hypotension (low blood pressure), but Claim 2 recommends Drug X to lower blood pressure, which would exacerbate the condition.",
        "claims": [
          { "id": "c1", "text": "Patient presents with acute hypotension." },
          { "id": "c2", "text": "Administering Drug X to lower blood pressure." }
        ]
      }
    ],
    "metadata": {
      "processing_time_ms": 1420
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
