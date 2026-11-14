<div align="center">

# Healthcare LLM Governance Toolkit

### A risk-assessment and oversight interface for healthcare AI systems.

![Status](https://img.shields.io/badge/Status-Prototype-E67E22?style=flat-square)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-2E7D32?style=flat-square)

[**Live demo →**](https://eaglepython.github.io/healthcare-llm-governance-toolkit)

<br/>

<img src="https://github.com/user-attachments/assets/e4e33cf8-456f-4eba-a9f7-27cc66f7a1cb" alt="Risk assessment view" width="88%"/>

<img src="https://github.com/user-attachments/assets/ab9903b2-91e5-454d-a0ae-89c64befb92e" alt="Oversight dashboard view" width="88%"/>

</div>

---

> [!NOTE]
> **Status: prototype with sample data.** This is a design demo. It is not connected to any data source, it does not monitor real AI systems, and no agency, committee, or company uses it. Figures in the oversight view are illustrative.

## What it does

The app has two views.

### Risk assessment

A questionnaire that scores a healthcare AI system across five areas and returns a 0–100 score with recommendations:

| Area | Weight |
|---|:---:|
| Clinical safety & efficacy | 30% |
| Data privacy & security | 25% |
| Bias & fairness | 20% |
| Transparency & explainability | 15% |
| Governance & accountability | 10% |

Scores of 80+ are labeled low risk, 60–79 medium, below 60 high. The questions and weights are my own design, informed by HIPAA, FDA guidance on AI/ML medical software, and the NIST AI Risk Management Framework. They have not been validated by a regulator or tested on real systems.

### Oversight dashboard

A mock-up of how aggregated results could be presented to a legislative or regulatory audience — a portfolio of systems, alerts, equity breakdowns, and policy options. All values shown are sample data.

## Run it locally

```bash
git clone https://github.com/eaglepython/healthcare-llm-governance-toolkit.git
cd healthcare-llm-governance-toolkit
npm install
npm start
```

## Roadmap

- Replace the sample data with a real, documented source
- Test the scoring questions with clinicians and compliance staff
- Add an audit-ready export for a completed assessment

## Built with

React · Tailwind CSS · lucide-react

## Author

**Joseph Bidias** — built to think through how AI oversight could work in practice in healthcare. [github.com/eaglepython](https://github.com/eaglepython)

<sub>Released under the MIT License.</sub>
