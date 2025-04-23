import { ComplianceRecord, ComplianceStatus, RiskAssessmentSchema, ComplianceReportSchema, PolicyDocumentSchema, RiskAssessment, ComplianceReport, PolicyDocument } from '../models/compliance-models';

export class ComplianceService {
    private riskAssessments: RiskAssessment[] = [];
    private complianceReports: ComplianceReport[] = [];
    private policyDocuments: PolicyDocument[] = [];

    async createRiskAssessment(data: unknown): Promise<RiskAssessment> {
        const validated = RiskAssessmentSchema.parse(data);
        const riskAssessment: RiskAssessment = {
            ...validated,
            riskId: validated.riskId || `risk-${Date.now()}`,
            dueDate: validated.dueDate || new Date().toISOString()
        };
        this.riskAssessments.push(riskAssessment);
        return riskAssessment;
    }

    async createComplianceReport(data: unknown): Promise<ComplianceReport> {
        const validated = ComplianceReportSchema.parse(data);
        const report: ComplianceReport = {
            ...validated,
            reportId: validated.reportId || `report-${Date.now()}`,
            createdAt: validated.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.complianceReports.push(report);
        return report;
    }

    async createPolicyDocument(data: unknown): Promise<PolicyDocument> {
        const validated = PolicyDocumentSchema.parse(data);
        const policy: PolicyDocument = {
            ...validated,
            policyId: validated.policyId || `policy-${Date.now()}`
        };
        this.policyDocuments.push(policy);
        return policy;
    }

    async getRiskAssessments(): Promise<RiskAssessment[]> {
        return this.riskAssessments;
    }

    async getRiskAssessmentById(riskId: string): Promise<RiskAssessment | undefined> {
        return this.riskAssessments.find(risk => risk.riskId === riskId);
    }

    async getComplianceReports(): Promise<ComplianceReport[]> {
        return this.complianceReports;
    }

    async getComplianceReportById(reportId: string): Promise<ComplianceReport | undefined> {
        return this.complianceReports.find(report => report.reportId === reportId);
    }

    async getPolicyDocuments(): Promise<PolicyDocument[]> {
        return this.policyDocuments;
    }

    async getPolicyDocumentById(policyId: string): Promise<PolicyDocument | undefined> {
        return this.policyDocuments.find(policy => policy.policyId === policyId);
    }

    async updateRiskAssessment(riskId: string, data: Partial<RiskAssessment>): Promise<RiskAssessment | undefined> {
        const index = this.riskAssessments.findIndex(risk => risk.riskId === riskId);
        if (index === -1) return undefined;

        const current = this.riskAssessments[index];
        const updated: RiskAssessment = {
            ...current,
            ...data,
            riskId // Ensure ID doesn't change
        };

        // Validate the updated data
        RiskAssessmentSchema.parse(updated);
        this.riskAssessments[index] = updated;
        return updated;
    }

    async updateComplianceReport(reportId: string, data: Partial<ComplianceReport>): Promise<ComplianceReport | undefined> {
        const index = this.complianceReports.findIndex(report => report.reportId === reportId);
        if (index === -1) return undefined;

        const current = this.complianceReports[index];
        const updated: ComplianceReport = {
            ...current,
            ...data,
            reportId, // Ensure ID doesn't change
            updatedAt: new Date().toISOString()
        };

        // Validate the updated data
        ComplianceReportSchema.parse(updated);
        this.complianceReports[index] = updated;
        return updated;
    }

    async updatePolicyDocument(policyId: string, data: Partial<PolicyDocument>): Promise<PolicyDocument | undefined> {
        const index = this.policyDocuments.findIndex(policy => policy.policyId === policyId);
        if (index === -1) return undefined;

        const current = this.policyDocuments[index];
        const updated: PolicyDocument = {
            ...current,
            ...data,
            policyId // Ensure ID doesn't change
        };

        // Validate the updated data
        PolicyDocumentSchema.parse(updated);
        this.policyDocuments[index] = updated;
        return updated;
    }

    async deleteRiskAssessment(riskId: string): Promise<boolean> {
        const initialLength = this.riskAssessments.length;
        this.riskAssessments = this.riskAssessments.filter(risk => risk.riskId !== riskId);
        return this.riskAssessments.length !== initialLength;
    }

    async deleteComplianceReport(reportId: string): Promise<boolean> {
        const initialLength = this.complianceReports.length;
        this.complianceReports = this.complianceReports.filter(report => report.reportId !== reportId);
        return this.complianceReports.length !== initialLength;
    }

    async deletePolicyDocument(policyId: string): Promise<boolean> {
        const initialLength = this.policyDocuments.length;
        this.policyDocuments = this.policyDocuments.filter(policy => policy.policyId !== policyId);
        return this.policyDocuments.length !== initialLength;
    }
}