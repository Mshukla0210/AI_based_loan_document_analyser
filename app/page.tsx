import Link from "next/link";
import { GlowPanel } from "@/components/GlowPanel";
import { SectionHeading } from "@/components/SectionHeading";
import { StatCard } from "@/components/StatCard";

const steps = [
  {
    title: "Ingest",
    text: "Upload KYC files, bank statements, salary slips, and property papers into one secured workspace.",
  },
  {
    title: "Analyze",
    text: "AI agents extract fields, validate completeness, compare values, and flag suspicious inconsistencies.",
  },
  {
    title: "Decide",
    text: "Review a clean recommendation panel with reasons, confidence, and a reviewer-friendly narrative.",
  },
];

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">AI-assisted underwriting workspace</div>
          <h1>
            Review loan files with
            <span> calm precision.</span>
          </h1>
          <p>
            Lenscore helps teams turn scattered PDFs into a fast, elegant decision workflow with live agent progress,
            document validation, and explainable risk insights.
          </p>
          <div className="hero-actions">
            <Link href="/analyzer" className="button button-primary">
              Launch Analyzer
            </Link>
            <Link href="/how-it-works" className="button button-secondary">
              Explore Workflow
            </Link>
          </div>
        </div>
        <GlowPanel className="hero-panel">
          <div className="panel-topline">
            <span>Active workflow</span>
            <span>07 agents linked</span>
          </div>
          <div className="signal-grid">
            <div className="signal-card signal-card-large">
              <p>Application Quality</p>
              <strong>88 / 100</strong>
              <span>Stable profile with moderate review required</span>
            </div>
            <div className="signal-card">
              <p>Missing Items</p>
              <strong>02</strong>
              <span>Income proof, property valuation</span>
            </div>
            <div className="signal-card">
              <p>Consistency Match</p>
              <strong>94%</strong>
              <span>Identity and banking records aligned</span>
            </div>
            <div className="signal-timeline">
              <div>
                <span className="timeline-dot" />
                <p>Extractor completed</p>
              </div>
              <div>
                <span className="timeline-dot active" />
                <p>Risk agent in progress</p>
              </div>
              <div>
                <span className="timeline-dot" />
                <p>Decision summary queued</p>
              </div>
            </div>
          </div>
        </GlowPanel>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Why it stands out"
          title="Designed like a premium product, not a dashboard template"
          description="The interface leans into dark surfaces, measured glow, spacious typography, and clear hierarchy so the product feels both technical and executive-ready."
        />
        <div className="stats-grid">
          <StatCard value="5x" label="Faster first review cycles" />
          <StatCard value="Realtime" label="Agent progress streamed to UI" />
          <StatCard value="Audit-ready" label="Decision trail with reasons" />
        </div>
      </section>

      <section className="section two-col">
        <div>
          <SectionHeading
            eyebrow="Workflow"
            title="A frontend shaped around the way analysts actually work"
            description="Everything important stays visible: documents, system progress, flags, and the final recommendation."
          />
        </div>
        <div className="step-list">
          {steps.map((step, index) => (
            <GlowPanel key={step.title} className="step-card">
              <span className="step-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </GlowPanel>
          ))}
        </div>
      </section>

      <section className="section">
        <GlowPanel className="signup-strip">
          <div>
            <span className="eyebrow">Account Layer</span>
            <h3>Authentication is part of the product, not an afterthought</h3>
            <p>
              New users can sign up from the landing page and their credentials and profile metadata are designed to flow into Supabase Auth for storage and session handling.
            </p>
          </div>
          <div className="signup-strip-actions">
            <Link href="/signup" className="button button-primary">
              Create Account
            </Link>
            <Link href="/login" className="button button-secondary">
              Existing User Login
            </Link>
          </div>
        </GlowPanel>
      </section>
    </div>
  );
}
