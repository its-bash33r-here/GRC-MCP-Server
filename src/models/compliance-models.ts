import { z } from 'zod';

export const RiskAssessmentSchema = z.object({
  riskId: z.string().optional(),
  riskName: z.string(),
  description: z.string(),
  category: z.string(),
  impact: z.number().min(1).max(5),
  likelihood: z.number().min(1).max(5),
  mitigationPlan: z.string(),
  owner: z.string(),
  dueDate: z.string().optional(),
});

export const ComplianceReportSchema = z.object({
  reportId: z.string().optional(),
  title: z.string(),
  regulationId: z.string(),
  status: z.enum(['compliant', 'non-compliant', 'in-progress']),
  findings: z.array(z.string()),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const PolicyDocumentSchema = z.object({
  policyId: z.string().optional(),
  title: z.string(),
  content: z.string(),
  version: z.string(),
  approvedBy: z.string(),
  effectiveDate: z.string(),
  reviewDate: z.string(),
});

// Typescript types inferred from Zod schemas
export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>;
export type ComplianceReport = z.infer<typeof ComplianceReportSchema>;
export type PolicyDocument = z.infer<typeof PolicyDocumentSchema>;

// Updated existing interfaces to use the new types
export interface ComplianceRecord {
    id: string;
    report: ComplianceReport;
    riskAssessments: RiskAssessment[];
    policies: PolicyDocument[];
}

export interface ComplianceStatus {
    status: 'compliant' | 'non-compliant' | 'pending';
    lastUpdated: string;
    reportId: string;
    findings: string[];
}