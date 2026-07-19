<div align="center">
  <img src="./public/favicon.svg" width="120" alt="Argus Logo">
  <h1>Argus</h1>
  <p><strong>A Domain-Agnostic Reasoning Integrity Auditor</strong></p>
  
  [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
</div>

<br/>

**Argus** audits the reasoning chains produced by large language models — flagging contradictions, unfaithful conclusions, and deceptive reasoning patterns — in any domain, without domain-specific tuning.

*Named after Argus Panoptes, the hundred-eyed giant of Greek myth who never fully slept: some eyes always stayed open, so nothing could move unseen.*

---

## 🎯 Problem Statement
LLMs increasingly get used in high-stakes settings — a doctor reviewing a diagnostic explanation, a lawyer reviewing a contract analysis, a DevOps engineer reviewing an incident root-cause report. In all of these, trust in the *final answer* isn’t enough — the **reasoning path** to that answer needs to hold up.

Reasoning chains can fail in specific, recurring ways that are easy to miss because the language sounds fluent and confident regardless of whether the logic actually holds:
* **Unfaithfulness** — the stated reasoning doesn’t actually support the stated conclusion.
* **Contradiction** — the chain asserts two things that can’t both be true.
* **Deceptive patterns** — reasoning that isn’t strictly false but is structured to create a misleading impression.

These failures are domain-independent. A contradiction is a contradiction whether it appears in a medical diagnosis or an incident postmortem. Argus is built around that single insight.

## 🏗️ Architecture
Argus is a domain-agnostic core with optional, pluggable domain lenses on top — not separate tools per industry.

1. **Claim decomposition** — breaks a reasoning chain into a graph of atomic, individually-checkable claims.
2. **Cross-claim consistency check** — checks every pair of claims for logical compatibility via entailment/contradiction analysis. Domain-blind by construction.
3. **Faithfulness check** — verifies the final conclusion is actually entailed by the claims used to justify it, not just plausible given them.
4. **Failure classification** — sorts flags into a universal taxonomy: contradiction, unsupported leap, circular reasoning, confidence miscalibration, omitted counter-evidence, sycophantic reasoning.
5. **Domain lens (optional)** — a lightweight config layer (glossary, calibration examples, severity weighting) for a specific audience. Adding a domain means writing a config, not rewriting detection logic.

## 💻 Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Three.js (WebGL Shaders)
* **Backend:** Vercel Serverless Functions (`/api`) — handles LLM calls server-side so API keys are never exposed client-side.

## 📂 Repo Structure
```text
argus/
├── src/                 # React frontend and UI components
├── api/                 # Vercel serverless backend functions
├── public/              # Static assets and SVGs
├── index.html           # Entry point and OpenGraph meta
├── vercel.json          # Vercel SPA routing configuration
├── tailwind.config.js   # Tailwind theme configuration
└── README.md
```

## 🚀 Deployment
1. Code pushed to GitHub. 
2. Repo imported into Vercel — auto-detects Vite frontend and `/api` serverless functions. 
3. API keys stored in Vercel environment variables, never committed. 
4. Every push to `main` auto-deploys; every pull request gets a preview URL.

## ⚡ Live Demo
The homepage includes a free-text field where a visitor can paste in a reasoning chain from *any* domain — no domain pre-selection required — and see Argus’s audit run live. This is the proof of the domain-agnostic claim, not just a description of it.

## 🌐 Supported Domains
Medical · Legal · DevOps · Finance · Policy · Research · Education  
*(New domains are added via configuration, not code changes.)*

## 🗺️ Roadmap
- [ ] Cross-domain benchmark suite — evaluate detection accuracy on reasoning chains from domains never explicitly tuned for.
- [ ] Labeled evaluation set for faithfulness/contradiction detection accuracy.
- [ ] Rate limiting and input caps on the public live demo.
- [ ] Open-source release under MIT license.

## 👨‍💻 Author
I'm **Gurinderpreet Singh**. CS student at TIET, currently learning most things by building them rather than reading about them first. Argus is the latest one.
