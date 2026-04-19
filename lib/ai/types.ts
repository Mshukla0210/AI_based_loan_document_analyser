export type UploadedDocument = {
  name: string;
  size: number;
  type: string;
};

export type ProgressItem = {
  label: string;
  state: "Queued" | "Running" | "Complete";
};

export type ReviewFinding = {
  severity: "low" | "medium" | "high";
  message: string;
};

export type LoanAnalysisResult = {
  status: "Approve with caution" | "Manual review recommended" | "Needs more documents";
  summary: string;
  progress: ProgressItem[];
  findings: ReviewFinding[];
};
