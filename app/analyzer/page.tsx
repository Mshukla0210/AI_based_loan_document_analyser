import { GlowPanel } from "@/components/GlowPanel";
import { SectionHeading } from "@/components/SectionHeading";

const uploads = [
  "Applicant_ID.pdf",
  "Salary_Slips_Q1.pdf",
  "Bank_Statement_6M.pdf",
  "Property_Details.pdf",
];

const progress = [
  { label: "Text extraction", state: "Complete" },
  { label: "Completeness validation", state: "Complete" },
  { label: "Cross-document matching", state: "Running" },
  { label: "Risk scoring", state: "Queued" },
];

const findings = [
  "Employer name is consistent across salary slips and bank credits.",
  "Requested loan amount may be high relative to observed monthly surplus.",
  "Property valuation certificate is referenced but not uploaded.",
];

export default function AnalyzerPage() {
  return (
    <div className="page-stack inner-page">
      <SectionHeading
        eyebrow="Analyzer"
        title="The workspace where uploads, progress, and findings meet"
        description="This page is built as the product demo surface. It already looks ready for Supabase uploads and realtime agent updates."
      />
      <div className="analyzer-grid">
        <GlowPanel className="upload-panel">
          <h3>Upload Queue</h3>
          <div className="upload-dropzone">
            <p>Drop loan documents here</p>
            <span>PDF, DOC, PNG supported</span>
          </div>
          <div className="file-list">
            {uploads.map((file) => (
              <div key={file} className="file-row">
                <span>{file}</span>
                <em>Synced</em>
              </div>
            ))}
          </div>
        </GlowPanel>

        <GlowPanel className="progress-panel">
          <h3>Agent Progress</h3>
          <div className="progress-list">
            {progress.map((item) => (
              <div key={item.label} className="progress-row">
                <span>{item.label}</span>
                <strong>{item.state}</strong>
              </div>
            ))}
          </div>
        </GlowPanel>

        <GlowPanel className="report-panel">
          <h3>Final Review Snapshot</h3>
          <div className="score-chip">Manual review recommended</div>
          <div className="finding-list">
            {findings.map((finding) => (
              <p key={finding}>{finding}</p>
            ))}
          </div>
        </GlowPanel>
      </div>
    </div>
  );
}
