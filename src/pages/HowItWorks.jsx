import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Claim decomposition',
    description: 'breaks the reasoning chain into a graph of atomic, checkable claims',
  },
  {
    number: '02',
    title: 'Cross-claim consistency check',
    description: 'checks every claim pair for logical compatibility, domain-blind by construction',
  },
  {
    number: '03',
    title: 'Faithfulness check',
    description: 'verifies the conclusion is actually entailed by its stated claims, not just plausible given them',
  },
  {
    number: '04',
    title: 'Failure classification',
    description: 'sorts flags into a universal taxonomy - contradiction, unsupported leap, circular reasoning, confidence miscalibration, omitted counter-evidence, sycophantic reasoning',
  },
  {
    number: '05',
    title: 'Domain lens (optional)',
    description: 'a lightweight config layer - glossary, calibration examples, severity weighting - for a specific audience',
  }
];

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 lg:px-16">
      <div className="mb-16">
        <h1 className="animate-fade-rise font-display text-4xl sm:text-5xl font-medium tracking-tight">
          How Argus reads a reasoning chain
        </h1>
        <p className="animate-fade-rise mt-4 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: '0.2s' }}>
          Five steps, none of them domain-specific. The same pipeline audits a diagnosis, a contract clause, or an incident report.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <div 
            key={step.number} 
            className="liquid-glass animate-fade-rise flex flex-col gap-4 rounded-2xl p-8 sm:flex-row sm:items-start sm:gap-8"
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <span className="font-display text-4xl text-white/40 shrink-0">
              {step.number}
            </span>
            <div>
              <h3 className="font-display text-2xl mb-2 text-white">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
