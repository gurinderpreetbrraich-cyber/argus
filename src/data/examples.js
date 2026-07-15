export const EXAMPLES = [
  {
    name: "Medical",
    benchmarked: true,
    commonFailure: "Contradiction",
    text: "Patient presents with severe hypotension. Administer standard dose of drug X. However, drug X is contraindicated in patients with low blood pressure.",
    domain: "medical",
    result: {
      status: "flagged",
      flags: [
        {
          id: "f1",
          type: "contradiction",
          severity: "high",
          claims: [
            { id: "c1", text: "Patient presents with severe hypotension." },
            { id: "c2", text: "Administer standard dose of drug X." },
            { id: "c3", text: "drug X is contraindicated in patients with low blood pressure." }
          ],
          explanation: "Claim 2 recommends administering drug X, but Claim 3 states drug X is contraindicated for low blood pressure, which the patient has (Claim 1).",
          highlightPatterns: ["Administer standard dose of drug X", "drug X is contraindicated in patients with low blood pressure"]
        }
      ]
    }
  },
  {
    name: "Legal",
    benchmarked: true,
    commonFailure: "Unsupported Leap",
    text: "The contract requires a 30-day notice for termination. The client sent notice on Oct 1st and terminated on Oct 15th, which satisfies the contract requirements.",
    domain: "legal",
    result: {
      status: "flagged",
      flags: [
        {
          id: "f1",
          type: "unsupported leap",
          severity: "high",
          claims: [
            { id: "c1", text: "The contract requires a 30-day notice for termination." },
            { id: "c2", text: "The client sent notice on Oct 1st and terminated on Oct 15th" },
            { id: "c3", text: "which satisfies the contract requirements." }
          ],
          explanation: "Claim 3 asserts that a 14-day duration (Oct 1st to Oct 15th) satisfies a condition defined as 30 days in Claim 1.",
          highlightPatterns: ["The contract requires a 30-day notice", "terminated on Oct 15th, which satisfies the contract requirements"]
        }
      ]
    }
  },
  {
    name: "Finance",
    benchmarked: true,
    commonFailure: "Sound Logic",
    text: "The company reported a 15% increase in Q3 revenue. Cost of goods sold decreased by 2%. This combination of higher revenue and lower costs led to a significant expansion in gross margin for the quarter.",
    domain: "finance",
    result: {
      status: "passed",
      flags: []
    }
  },
  {
    name: "DevOps",
    benchmarked: false,
    commonFailure: "Circular Reasoning",
    text: "The database cluster experienced high latency. We scaled read replicas by 3x to handle the load. The latency dropped because the system was performing better, which proves the system performed better because latency dropped.",
    domain: "devops",
    result: {
      status: "flagged",
      flags: [
        {
          id: "f1",
          type: "circular reasoning",
          severity: "medium",
          claims: [
            { id: "c1", text: "The latency dropped because the system was performing better" },
            { id: "c2", text: "proves the system performed better because latency dropped" }
          ],
          explanation: "The reasoning uses the drop in latency to prove better performance, and the better performance to explain the drop in latency, providing no actual root cause analysis.",
          highlightPatterns: ["latency dropped because the system was performing better", "proves the system performed better because latency dropped"]
        }
      ]
    }
  },
  {
    name: "Policy",
    benchmarked: false,
    commonFailure: "Confidence Miscalibration",
    text: "Traffic congestion in the downtown sector increased by 4% last year. Therefore, implementing a $15 toll will absolutely eliminate all congestion and reduce carbon emissions to zero within six months.",
    domain: "policy",
    result: {
      status: "flagged",
      flags: [
        {
          id: "f1",
          type: "confidence miscalibration",
          severity: "high",
          claims: [
            { id: "c1", text: "Traffic congestion increased by 4%." },
            { id: "c2", text: "A $15 toll will absolutely eliminate all congestion and reduce carbon emissions to zero." }
          ],
          explanation: "The conclusion states an absolute certainty ('absolutely eliminate', 'reduce to zero') that cannot be logically proven by a simple 4% historical increase and a proposed toll.",
          highlightPatterns: ["absolutely eliminate all congestion and reduce carbon emissions to zero"]
        }
      ]
    }
  },
  {
    name: "Research",
    benchmarked: false,
    commonFailure: "Unsupported Leap",
    text: "Mice treated with Compound Y showed a 20% reduction in tumor size over 4 weeks. Therefore, Compound Y is ready to be prescribed as a first-line treatment for human patients.",
    domain: "research",
    result: {
      status: "flagged",
      flags: [
        {
          id: "f1",
          type: "unsupported leap",
          severity: "high",
          claims: [
            { id: "c1", text: "Mice treated with Compound Y showed a 20% reduction in tumor size" },
            { id: "c2", text: "Compound Y is ready to be prescribed as a first-line treatment for human patients." }
          ],
          explanation: "Success in an animal model (mice) cannot be directly extrapolated to immediate human clinical application without human trials.",
          highlightPatterns: ["ready to be prescribed as a first-line treatment for human patients"]
        }
      ]
    }
  },
  {
    name: "Education",
    benchmarked: false,
    commonFailure: "Sound Logic",
    text: "The new curriculum introduces calculus concepts in the 10th grade rather than the 11th. Based on standardized testing data from the pilot program, early exposure resulted in a 12% higher pass rate on the AP exam.",
    domain: "education",
    result: {
      status: "passed",
      flags: []
    }
  }
];
