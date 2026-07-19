<div align="center">
  <img src="./public/favicon.svg" width="100" alt="Argus Logo" style="margin-bottom: 20px;">
  
  <h1>A R G U S</h1>
  <p><strong>A Domain-Agnostic Reasoning Integrity Auditor</strong></p>
  
  <p>
    <a href="https://argus-gules-omega.vercel.app"><img src="https://img.shields.io/badge/demo-live-brightgreen.svg?style=for-the-badge" alt="Live Demo"></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge" alt="License: MIT"></a>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"></a>
    <a href="https://vercel.com/"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
  </p>

  <p>
    <a href="https://argus-gules-omega.vercel.app">Live Site</a> · 
    <a href="../../issues">Report a Bug</a> · 
    <a href="../../issues">Request a Feature</a>
  </p>
</div>

<br/>

> **Argus** audits the reasoning chains produced by large language models — flagging contradictions, unfaithful conclusions, and deceptive reasoning patterns — in *any* domain, without domain-specific tuning.

<p align="center">
  <em>Named after Argus Panoptes, the hundred-eyed giant of Greek myth who never fully slept: some eyes always stayed open, so nothing could move unseen.</em>
</p>

---

## 🎯 Why Argus

Large language models increasingly get used in high-stakes settings — a doctor reviewing a diagnostic explanation, a lawyer reviewing a contract analysis, an engineer reviewing an incident root-cause report. In all of these, trust in the *final answer* isn’t enough — the **reasoning path** to that answer needs to hold up.

Chain-of-thought explanations can sound reasoned while masking a different underlying process. This gap between **stated** reasoning and **actual** reasoning is a known, active problem in interpretability research. Most existing tools that attempt to catch it are built narrowly — tuned for one domain, one failure type, or one kind of output.

**Argus's bet:** reasoning failures are structural, not domain-specific. A contradiction is a contradiction whether it appears in a medical diagnosis or an incident postmortem. One well-built engine, paired with thin configurable domain lenses, can do the job of a dozen narrow tools.

| Failure Mode | Description |
| :--- | :--- |
| 🎭 **Unfaithfulness** | The stated reasoning doesn’t actually support the stated conclusion. |
| ⚔️ **Contradiction** | The chain asserts two things that can’t both be true. |
| 🪤 **Deceptive Patterns** | Reasoning that isn’t strictly false but is structured to create a misleading impression. |

> [!IMPORTANT]  
> These failures are **domain-independent**. A contradiction is a contradiction whether it appears in a medical diagnosis or an incident postmortem. Argus is built around that single insight.

---

## 🏗️ How it Works

Argus decomposes a reasoning chain into a graph of atomic claims, then runs it through a five-stage, domain-blind pipeline:

```text
  Reasoning chain
        │
        ▼
  1. Claim decomposition        → break into atomic, checkable claims
        │
        ▼
  2. Consistency check          → pairwise entailment/contradiction analysis
        │
        ▼
  3. Faithfulness check         → does the conclusion actually follow from the claims?
        │
        ▼
  4. Failure classification     → contradiction / unsupported leap / circular
        │                          reasoning / confidence miscalibration / ...
        ▼
  5. Domain lens (optional)     → glossary + severity weighting for a specific audience
        │
        ▼
    Audit result
```

<details open>
<summary><b>1. Claim Decomposition</b></summary>
Breaks a reasoning chain into a graph of atomic, individually-checkable claims.
</details>

<details open>
<summary><b>2. Cross-Claim Consistency Check</b></summary>
Checks every pair of claims for logical compatibility via entailment/contradiction analysis. Domain-blind by construction.
</details>

<details open>
<summary><b>3. Faithfulness Check</b></summary>
Verifies the final conclusion is actually entailed by the claims used to justify it, not just plausible given them.
</details>

<details open>
<summary><b>4. Failure Classification</b></summary>
Sorts flags into a universal taxonomy: contradiction, unsupported leap, circular reasoning, confidence miscalibration, omitted counter-evidence, sycophantic reasoning.
</details>

<details open>
<summary><b>5. Domain Lens (Optional)</b></summary>
A lightweight config layer (glossary, calibration examples, severity weighting) for a specific audience. Adding a domain means writing a config, not rewriting detection logic.
</details>

---

## 🌐 Supported Domains

*No code changes required. New domains are added purely via configuration.*

`Medical` `Legal` `DevOps` `Finance` `Policy` `Research` `Education`

---

## ⚡ Live Demo

**[argus-gules-omega.vercel.app](https://argus-gules-omega.vercel.app)**

Paste a reasoning chain from *any* domain into the live demo and watch Argus flag contradictions and faithfulness gaps in real time. This is the proof of the domain-agnostic claim, not just a description of it.

---

## 💻 Tech Stack & Repo Structure

<table>
<tr>
<td width="55%">

### Tech Stack
* **Frontend:** React + Vite + TypeScript
* **Styling:** Tailwind CSS + shadcn/ui
* **Graphics:** Three.js (WebGL Shaders)
* **Backend:** Vercel Serverless Functions (`/api`) 
* **LLM Provider:** Google Gemini API

*Vite was chosen over a full meta-framework for dev-server speed; serverless functions keep the API key server-side without needing a separate backend service.*
</td>
<td width="45%">

### Directory Map
```text
argus/
├── src/
│   ├── components/
│   │   └── ui/       # Reusable primitives 
│   ├── pages/        # Route components
│   └── index.css     # Global styles
├── api/
│   └── audit.ts      # Serverless LLM call
├── public/           # Static assets
├── index.html        # Meta & OG tags
├── vercel.json       # SPA routing config
└── README.md
```
</td>
</tr>
</table>

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API key ([aistudio.google.com/apikey](https://aistudio.google.com/apikey))

### Installation

```bash
git clone https://github.com/gurinderpreetbrraich-cyber/argus.git
cd argus
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```
*(Never commit `.env.local` — it's already covered by `.gitignore`.)*

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

---

## 🔌 API Reference

The live demo calls a single serverless endpoint:

**`POST /api/audit`**

```json
// Request
{
  "reasoningChain": "string — the reasoning chain to audit"
}
```

```json
// Response
{
  "claims": [{ "id": "string", "text": "string" }],
  "flags": [
    {
      "claimIds": ["string"],
      "category": "contradiction | unsupported_leap | circular_reasoning | confidence_miscalibration",
      "explanation": "string"
    }
  ],
  "status": "clean | flagged"
}
```

Full documentation: see the [Docs page](https://argus-gules-omega.vercel.app/docs) on the live site.

---

## 🗺️ Roadmap

- [x] Complete remaining pages: Live demo, Domains, Benchmark, Docs, About
- [x] Populate Benchmark page with real evaluation results
- [ ] Cross-domain benchmark suite — evaluate accuracy on reasoning chains never explicitly tuned for
- [ ] Rate limiting and input caps on the public live demo
- [ ] Shareable audit result links
- [ ] Open-source the domain lens config format

---

## ⚠️ Known Limitations

This is an actively developed student project, not a production-hardened service. Specifically:
- The live demo has no rate limiting yet — expect this to change as it's finished.
- Domain lenses currently listed are illustrative; formal cross-domain benchmarking is in progress, not yet published.

---

## 🤝 Contributing

This project is currently maintained solo, but issues and suggestions are welcome — open an [issue](../../issues) or reach out directly (see below).

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

## 👨‍💻 Author

I'm **Gurinderpreet Singh**. CS student at TIET, currently learning most things by building them rather than reading about them first. Argus is the latest one.

- **GitHub:** [@gurinderpreetbrraich-cyber](https://github.com/gurinderpreetbrraich-cyber)
