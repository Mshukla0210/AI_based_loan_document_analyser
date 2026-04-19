import { GlowPanel } from "@/components/GlowPanel";
import { SectionHeading } from "@/components/SectionHeading";

const pillars = [
  "Problem: Loan teams lose time reviewing fragmented documents manually.",
  "Goal: Build an AI-first review assistant that reduces friction and improves explainability.",
  "Approach: Use a multi-agent workflow, a polished frontend, and a structured analysis pipeline.",
  "Outcome: A portfolio-ready product narrative with clear business value and technical depth.",
];

export default function CaseStudyPage() {
  return (
    <div className="page-stack inner-page">
      <SectionHeading
        eyebrow="PM Framing"
        title="Case study positioning for recruiters, founders, and product teams"
        description="This page frames the build as a thoughtful product decision, not just a technical demo."
      />
      <div className="case-grid">
        {pillars.map((pillar) => (
          <GlowPanel key={pillar} className="case-card">
            <p>{pillar}</p>
          </GlowPanel>
        ))}
      </div>
    </div>
  );
}
