import { GlowPanel } from "@/components/GlowPanel";
import { SectionHeading } from "@/components/SectionHeading";

const flow = [
  {
    title: "Document Intake",
    body: "Users upload identity proofs, income records, bank statements, and property files in one guided intake flow.",
  },
  {
    title: "AI Extraction",
    body: "The system extracts applicant data, financial values, dates, and supporting document signals from every file.",
  },
  {
    title: "Validation Layer",
    body: "Agent checks compare records, spot missing items, and identify field-level conflicts before recommendation.",
  },
  {
    title: "Risk Summary",
    body: "The analyzer returns a structured, readable summary with risks, confidence, and approval direction.",
  },
];

const liveArchitecture = [
  {
    stage: "01",
    label: "Document intake",
    title: "Upload gateway",
    detail: "Borrower files enter the case workspace",
    status: "Active",
    meta: "Last refresh 10 seconds ago",
    className: "node-top-left",
  },
  {
    stage: "02",
    label: "Extraction layer",
    title: "Document intelligence agents",
    detail: "OCR and field mapping create structured records",
    status: "Active",
    meta: "Last refresh 1 minute ago",
    className: "node-top-center",
  },
  {
    stage: "03",
    label: "Validation layer",
    title: "Cross-check and rule engine",
    detail: "Income and identity checks resolve mismatches",
    status: "Active",
    meta: "Last refresh 35 minutes ago",
    className: "node-top-right",
  },
  {
    stage: "04",
    label: "Output layer",
    title: "Decision summary",
    detail: "Reviewer-ready risk recommendation",
    status: "Live",
    meta: "Updated yesterday",
    className: "node-bottom-left",
  },
  {
    stage: "05",
    label: "Analyst layer",
    title: "Case handoff",
    detail: "Final review package and evidence trail",
    status: "Live",
    meta: "Updated 1 minute ago",
    className: "node-bottom-right",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="page-stack inner-page">
      <SectionHeading
        eyebrow="System Flow"
        title="How the analyzer moves from raw PDFs to a clean decision view"
        description="This page gives the product story in a recruiter-friendly way while still showing the operational structure behind the experience."
      />
      <div className="workflow-grid">
        {flow.map((item, index) => (
          <GlowPanel key={item.title} className="workflow-card">
            <span className="step-index">0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </GlowPanel>
        ))}
      </div>
      <section className="live-architecture-section">
        <SectionHeading
          eyebrow="Live Working Overview"
          title="Architecture of the process from intake to decision"
          description="This diagram shows the workflow as a live system with connected stages, a central analysis bus, and the final analyst output."
        />
        <GlowPanel className="architecture-diagram-panel">
          <div className="architecture-scene">
            <div className="architecture-grid" />
            <svg
              className="architecture-connectors"
              viewBox="0 0 1200 640"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path fill="none" d="M 215 176 L 215 300 Q 215 335 255 335 L 505 335" />
              <path fill="none" d="M 600 176 L 600 300" />
              <path fill="none" d="M 985 176 L 985 300 Q 985 335 945 335 L 695 335" />
              <path fill="none" d="M 600 364 L 600 430" />
              <path fill="none" d="M 600 430 L 600 488 Q 600 510 578 510 L 362 510" />
              <path fill="none" d="M 600 430 L 600 488 Q 600 510 622 510 L 838 510" />
              <circle cx="215" cy="176" r="6" />
              <circle cx="600" cy="176" r="6" />
              <circle cx="985" cy="176" r="6" />
              <circle cx="505" cy="335" r="6" />
              <circle cx="695" cy="335" r="6" />
              <circle cx="600" cy="300" r="6" />
              <circle cx="600" cy="364" r="6" />
              <circle cx="362" cy="510" r="6" />
              <circle cx="838" cy="510" r="6" />
            </svg>
            <div className="architecture-core">
              <span>Analysis hub</span>
              <strong>Lenscore orchestration engine</strong>
            </div>
            {liveArchitecture.map((item) => (
              <article key={item.stage} className={`architecture-node ${item.className}`}>
                <div className="architecture-node-head">
                  <div>
                    <span className="architecture-node-step">{item.stage}</span>
                    <span className="architecture-node-label">{item.label}</span>
                  </div>
                  <span className="architecture-node-menu">...</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <div className="architecture-node-footer">
                  <div>
                    <span>Status</span>
                    <strong>{item.status}</strong>
                  </div>
                  <small>{item.meta}</small>
                </div>
              </article>
            ))}
          </div>
        </GlowPanel>
      </section>
      <GlowPanel className="wide-panel">
        <h3>Frontend perspective</h3>
        <p>
          The UI is intentionally split into a landing experience, a workflow explanation page, and a dedicated analyzer surface so the product feels like a real SaaS platform instead of a single-screen demo.
        </p>
      </GlowPanel>
    </div>
  );
}
