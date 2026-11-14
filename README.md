# Healthcare LLM Governance Toolkit

![status](https://img.shields.io/badge/status-prototype-orange) ![license](https://img.shields.io/badge/license-MIT-green) ![built_with](https://img.shields.io/badge/built_with-React-61DAFB) ![styling](https://img.shields.io/badge/styling-Tailwind_CSS-38B2AC)

![Demo screenshot 1](https://github.com/user-attachments/assets/e4e33cf8-456f-4eba-a9f7-27cc66f7a1cb)

![Demo screenshot 2](https://github.com/user-attachments/assets/ab9903b2-91e5-454d-a0ae-89c64befb92e)

*Screenshots of the demo. All figures shown are sample data.*

A front-end prototype that shows what a risk assessment and oversight tool for healthcare AI systems could look like.

**Status: prototype with sample data.** This is a design demo. It is not connected to any data source, it does not monitor real AI systems, and no agency, committee, or company uses it.

Live demo: https://eaglepython.github.io/healthcare-llm-governance-toolkit

## What it does

The app has two views.

**Risk assessment view.** A questionnaire that scores a healthcare AI system across five areas and returns a 0 to 100 score with recommendations. The weights are:

| Area | Weight |
|---|---|
| Clinical Safety and Efficacy | 30% |
| Data Privacy and Security | 25% |
| Bias and Fairness | 20% |
| Transparency and Explainability | 15% |
| Governance and Accountability | 10% |

A score of 80 or above is labeled low risk, 60 to 79 medium risk, and below 60 high risk. The questions and weights are my own design, informed by HIPAA, FDA guidance on AI/ML medical software, and the NIST AI Risk Management Framework. They have not been validated by a regulator or tested on real systems.

**Oversight dashboard view.** A mock-up of how aggregated results could be presented to a legislative or regulatory audience: a portfolio of systems, alerts, equity breakdowns, and policy options.

## About the data in the demo

Everything shown in the oversight dashboard is sample data typed into the source code. That includes the counts of systems and patients, the market figures, the alerts, the committee names, and the bill titles. The alerts and scores attached to named vendors are made-up examples. They are not findings about real products.

## What I would build next

- Replace the sample data with a real, documented data source
- Test the scoring questions with clinicians and compliance staff
- Add a clear way to export an assessment for audit

## Run it locally

```bash
git clone https://github.com/eaglepython/healthcare-llm-governance-toolkit.git
cd healthcare-llm-governance-toolkit
npm install
npm start
```

Built with React and Tailwind CSS.

## Author

Joseph Bidias. I built this to think through how AI oversight could work in practice in healthcare, based on my experience working with AI systems in public health.

## License

MIT
