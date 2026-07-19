<div align="center">
  <img src="./public/favicon.svg" width="100" alt="Argus Logo" style="margin-bottom: 20px;">
  
  <h1>A R G U S</h1>
  <p><strong>A Domain-Agnostic Reasoning Integrity Auditor</strong></p>
  
  <p>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"></a>
    <a href="https://vercel.com/"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
  </p>
</div>

<br/>

> **Argus** audits the reasoning chains produced by large language models — flagging contradictions, unfaithful conclusions, and deceptive reasoning patterns — in *any* domain, without domain-specific tuning.

<p align="center">
  <em>Named after Argus Panoptes, the hundred-eyed giant of Greek myth who never fully slept: some eyes always stayed open, so nothing could move unseen.</em>
</p>

---

## 🎯 The Problem

LLMs increasingly get used in high-stakes settings — a doctor reviewing a diagnostic explanation, a lawyer reviewing a contract analysis, a DevOps engineer reviewing an incident root-cause report. In all of these, trust in the *final answer* isn’t enough — the **reasoning path** to that answer needs to hold up.

Reasoning chains can fail in specific, recurring ways that are easy to miss because the language sounds fluent and confident regardless of whether the logic actually holds:

| Failure Mode | Description |
| :--- | :--- |
| 🎭 **Unfaithfulness** | The stated reasoning doesn’t actually support the stated conclusion. |
| ⚔️ **Contradiction** | The chain asserts two things that can’t both be true. |
| 🪤 **Deceptive Patterns** | Reasoning that isn’t strictly false but is structured to create a misleading impression. |

> [!IMPORTANT]  
> These failures are **domain-independent**. A contradiction is a contradiction whether it appears in a medical diagnosis or an incident postmortem. Argus is built around that single insight.

---

## 🏗️ Architecture

Argus is a domain-agnostic core with optional, pluggable domain lenses on top — not separate tools per industry.

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

The homepage includes a free-text field where a visitor can paste in a reasoning chain from *any* domain — no domain pre-selection required — and see Argus’s audit run live. This is the proof of the domain-agnostic claim, not just a description of it.

---

## 💻 Tech Stack & Repo Structure

<table>
<tr>
<td width="55%">

### Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, shadcn/ui
* **Graphics:** Three.js (WebGL Shaders)
* **Backend:** Vercel Serverless Functions (`/api`) handles LLM calls server-side so API keys are never exposed client-side.

</td>
<td width="45%">

### Directory Map
```text
argus/
├── src/            # React frontend & UI
├── api/            # Serverless backend 
├── public/         # Static assets
├── index.html      # Meta & OG tags
├── vercel.json     # SPA routing config
└── README.md
```
</td>
</tr>
</table>

---

## 🚀 Deployment

1. Code is pushed to GitHub.
2. Repo is imported into **Vercel** — auto-detects the Vite frontend and `/api` serverless functions.
3. API keys are stored securely in Vercel environment variables, never committed.
4. Every push to `main` auto-deploys; every pull request gets an isolated preview URL.

---

## 🗺️ Roadmap

- [ ] **Cross-domain benchmark suite** — evaluate detection accuracy on reasoning chains from domains never explicitly tuned for.
- [ ] **Labeled evaluation set** for faithfulness/contradiction detection accuracy.
- [ ] **Rate limiting** and input caps on the public live demo.
- [ ] **Open-source release** under MIT license.

---

## 👨‍💻 Author

I'm **Gurinderpreet Singh**. CS student at TIET, currently learning most things by building them rather than reading about them first. Argus is the latest one.
