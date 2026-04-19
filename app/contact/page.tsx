import { GlowPanel } from "@/components/GlowPanel";
import { SectionHeading } from "@/components/SectionHeading";

export default function ContactPage() {
  return (
    <div className="page-stack inner-page">
      <SectionHeading
        eyebrow="Contact"
        title="Turn this concept into a deployable underwriting experience"
        description="A compact closing page for portfolio presentation, founder demos, or freelance outreach."
      />
      <GlowPanel className="contact-panel">
        <div>
          <h3>Project Scope</h3>
          <p>React frontend, Supabase backend, LangGraph orchestration, Groq-powered intelligence.</p>
        </div>
        <div>
          <h3>Best For</h3>
          <p>Portfolio showcases, AI product demos, and financial workflow automation prototypes.</p>
        </div>
      </GlowPanel>
    </div>
  );
}
