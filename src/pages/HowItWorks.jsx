import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight, BookOpen, AlertTriangle, GitCommit, Target, HelpCircle, UserCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Claim decomposition',
    description: 'breaks the reasoning chain into a graph of atomic, checkable claims',
    justification: 'Semantic parsing identifies declarative statements based on linguistic syntax, independent of the field-specific vocabulary used within those statements.',
    exampleCode: `[
  { "id": "c1", "text": "Patient presents with severe hypotension." },
  { "id": "c2", "text": "Administer standard dose of drug X." },
  { "id": "c3", "text": "Drug X is contraindicated in patients with low blood pressure." }
]`
  },
  {
    number: '02',
    title: 'Cross-claim consistency check',
    description: 'checks every claim pair for logical compatibility',
    justification: 'Entailment analysis operates strictly on logical structure (A contradicts B) rather than requiring ground-truth subject matter expertise.',
    exampleCode: `Evaluating pairs...
[c1 ↔ c2] -> PASS
[c1 ↔ c3] -> PASS
[c2 ↔ c3] -> CONFLICT DETECTED
c2: "Administer standard dose of drug X."
c3: "Drug X is contraindicated in patients with low blood pressure."`
  },
  {
    number: '03',
    title: 'Faithfulness check',
    description: 'verifies the conclusion is actually entailed by its stated claims, not just plausible given them',
    justification: 'This verifies structural dependency—does the conclusion logically derive from the specific premises provided, regardless of whether the premises are universally true.',
    exampleCode: `Conclusion: Administer drug X.
Premises evaluated: [c1, c3]
Entailment check: FAILED 
Reason: Premise c3 explicitly forbids the action in the conclusion.`
  },
  {
    number: '04',
    title: 'Failure classification',
    description: 'sorts flags into a universal taxonomy of reasoning errors',
    justification: 'Logical fallacies are mathematical structural flaws; a contradiction in DevOps is structurally identical to a contradiction in Law.',
    exampleCode: `{
  "flag_id": "f1",
  "category": "Contradiction",
  "severity": "High",
  "explanation": "Claim 2 recommends drug X, but Claim 3 states it is contraindicated for low blood pressure, which the patient has (Claim 1)."
}`
  },
  {
    number: '05',
    title: 'Domain lens (optional)',
    description: 'a lightweight config layer—glossary, calibration examples, severity weighting—for a specific audience',
    justification: 'The core auditing engine is untouched. The lens acts merely as a localized translation dictionary and weighting system injected at inference time.',
    exampleCode: `{
  "domain": "medical",
  "glossary_overrides": [
    { "term": "hypotension", "implies": "low blood pressure" }
  ],
  "severity_weights": { "contradiction": 1.0 }
}`
  }
];

const taxonomy = [
  { icon: AlertTriangle, name: "Contradiction", desc: "Two claims in the same chain assert mutually exclusive facts." },
  { icon: GitCommit, name: "Unsupported Leap", desc: "The conclusion requires implicit premises that were never stated." },
  { icon: Target, name: "Circular Reasoning", desc: "The conclusion is used as a premise to prove itself." },
  { icon: HelpCircle, name: "Confidence Miscalibration", desc: "The conclusion asserts absolute certainty derived from probabilistic premises." },
  { icon: BookOpen, name: "Omitted Counter-evidence", desc: "The chain selectively ignores contradictory evidence established earlier." },
  { icon: UserCheck, name: "Sycophantic Reasoning", desc: "The logic bends to agree with a user prompt rather than following the premises." }
];

export default function HowItWorks() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (index) => {
    if (expandedStep === index) {
      setExpandedStep(null);
    } else {
      setExpandedStep(index);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 lg:px-16 font-body">
      <div className="mb-16">
        <h1 className="animate-fade-rise font-display text-4xl sm:text-5xl font-medium tracking-tight text-white">
          How Argus reads a reasoning chain
        </h1>
        <p className="animate-fade-rise mt-4 max-w-2xl text-lg text-white/60 leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Five steps, none of them domain-specific. The same pipeline audits a diagnosis, a contract clause, or an incident report.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-24">
        {steps.map((step, index) => {
          const isExpanded = expandedStep === index;
          return (
            <div 
              key={step.number} 
              className="liquid-glass animate-fade-rise flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div 
                className="p-8 cursor-pointer hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-start sm:gap-8"
                onClick={() => toggleStep(index)}
              >
                <span className="font-display text-4xl text-white/40 shrink-0 mb-4 sm:mb-0">
                  {step.number}
                </span>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-2xl text-white">{step.title}</h3>
                    {isExpanded ? <ChevronUp className="text-white/40" /> : <ChevronDown className="text-white/40" />}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-4">{step.description}</p>
                  
                  {step.number === '04' && (
                    <div className="mb-4">
                      <Link to="/domains" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors">
                        See failure patterns by domain <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-white/10 animate-fade-rise">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                        <div className="text-xs uppercase tracking-wider text-white/40 mb-2">Why it's domain-blind</div>
                        <p className="text-sm text-white/80">{step.justification}</p>
                      </div>
                      
                      <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-white/5 px-4 py-2 border-b border-white/10 text-xs text-white/40 font-mono flex items-center justify-between">
                          <span>Worked Example (Medical)</span>
                        </div>
                        <div className="p-4 overflow-x-auto">
                          <pre className="text-sm font-mono leading-relaxed text-white/80 whitespace-pre-wrap break-words">
                            <code>{step.exampleCode}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Universal Taxonomy Reference Block */}
      <div className="animate-fade-rise mb-24" style={{ animationDelay: '0.9s' }}>
        <h2 className="text-3xl font-display text-white mb-8 border-b border-white/10 pb-4">
          The Universal Taxonomy
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {taxonomy.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="liquid-glass p-5 rounded-xl border border-white/10 flex items-start gap-4">
                <div className="bg-white/10 p-2 rounded-lg shrink-0 mt-0.5">
                  <Icon size={18} className="text-white/80" />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">{item.name}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="animate-fade-rise text-center" style={{ animationDelay: '1.0s' }}>
        <div className="liquid-glass rounded-3xl p-12 inline-block w-full border border-white/10">
          <h2 className="text-3xl font-display text-white mb-4">Don't take it on faith.</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Run a reasoning chain through the pipeline yourself and see the audit process in action.
          </p>
          <Link 
            to="/demo"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all hover:scale-105"
          >
            Test the pipeline live <ArrowRight size={18} />
          </Link>
        </div>
      </div>

    </div>
  );
}
