import React from 'react';
import { Link } from 'react-router-dom';

const domains = [
  { name: 'Medical', description: 'Diagnostic chains, clinical guidelines, and treatment protocols.' },
  { name: 'Legal', description: 'Contract analysis, statutory interpretation, and case law application.' },
  { name: 'DevOps', description: 'Incident postmortems, root-cause analysis, and architecture decisions.' },
  { name: 'Finance', description: 'Risk assessments, market analysis, and compliance audits.' },
  { name: 'Policy', description: 'Regulatory impact assessments and policy logic verification.' },
  { name: 'Research', description: 'Methodology justification and literature synthesis.' },
  { name: 'Education', description: 'Curriculum alignment and grading rubrics.' },
];

export default function Domains() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-12 lg:px-16">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="animate-fade-rise font-display text-4xl sm:text-5xl font-medium tracking-tight">
          Built for any domain, tuned for none
        </h1>
        <p className="animate-fade-rise mt-6 text-lg text-muted-foreground leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Adding a domain lens is a configuration change, not a model rebuild. A lens simply provides a glossary, calibration examples, and severity weighting for a specific audience.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
        {domains.map((domain, index) => (
          <div 
            key={domain.name}
            className="liquid-glass animate-fade-rise flex flex-col gap-3 rounded-2xl p-6"
            style={{ animationDelay: `${0.3 + index * 0.05}s` }}
          >
            <h3 className="font-display text-2xl text-white">{domain.name}</h3>
            <p className="text-sm text-muted-foreground">{domain.description}</p>
          </div>
        ))}
      </div>

      <div className="animate-fade-rise flex justify-center" style={{ animationDelay: '0.8s' }}>
        <Link 
          to="/demo"
          className="liquid-glass rounded-full px-8 py-4 font-medium text-white transition-transform hover:scale-[1.03]"
        >
          Test a domain we haven't listed
        </Link>
      </div>
    </div>
  );
}
