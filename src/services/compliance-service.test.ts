import { ComplianceService } from './compliance-service';
import { RiskAssessment, ComplianceReport, PolicyDocument } from '../models/compliance-models';

describe('ComplianceService', () => {
  let service: ComplianceService;

  beforeEach(() => {
    service = new ComplianceService();
  });

  describe('Risk Assessment', () => {
    const validRiskAssessment = {
      riskName: 'Test Risk',
      description: 'Test Description',
      category: 'Test Category',
      impact: 3,
      likelihood: 4,
      mitigationPlan: 'Test Plan',
      owner: 'Test Owner'
    };

    it('should create a risk assessment', async () => {
      const result = await service.createRiskAssessment(validRiskAssessment);
      expect(result.riskName).toBe(validRiskAssessment.riskName);
      expect(result.riskId).toBeDefined();
    });

    it('should reject invalid impact values', async () => {
      await expect(service.createRiskAssessment({
        ...validRiskAssessment,
        impact: 6
      })).rejects.toThrow();
    });

    it('should update a risk assessment', async () => {
      const created = await service.createRiskAssessment(validRiskAssessment);
      const updated = await service.updateRiskAssessment(created.riskId!, {
        description: 'Updated Description'
      });
      expect(updated?.description).toBe('Updated Description');
    });

    it('should delete a risk assessment', async () => {
      const created = await service.createRiskAssessment(validRiskAssessment);
      const result = await service.deleteRiskAssessment(created.riskId!);
      expect(result).toBe(true);
      const found = await service.getRiskAssessmentById(created.riskId!);
      expect(found).toBeUndefined();
    });
  });

  describe('Compliance Report', () => {
    const validReport = {
      title: 'Test Report',
      regulationId: 'REG-001',
      status: 'in-progress' as const,
      findings: ['Finding 1']
    };

    it('should create a compliance report', async () => {
      const result = await service.createComplianceReport(validReport);
      expect(result.title).toBe(validReport.title);
      expect(result.reportId).toBeDefined();
    });

    it('should update a compliance report', async () => {
      const created = await service.createComplianceReport(validReport);
      const updated = await service.updateComplianceReport(created.reportId!, {
        status: 'compliant'
      });
      expect(updated?.status).toBe('compliant');
    });
  });

  describe('Policy Document', () => {
    const validPolicy = {
      title: 'Test Policy',
      content: 'Test Content',
      version: '1.0.0',
      approvedBy: 'Test Approver',
      effectiveDate: new Date().toISOString(),
      reviewDate: new Date().toISOString()
    };

    it('should create a policy document', async () => {
      const result = await service.createPolicyDocument(validPolicy);
      expect(result.title).toBe(validPolicy.title);
      expect(result.policyId).toBeDefined();
    });

    it('should list all policy documents', async () => {
      await service.createPolicyDocument(validPolicy);
      await service.createPolicyDocument({
        ...validPolicy,
        title: 'Second Policy'
      });
      const policies = await service.getPolicyDocuments();
      expect(policies.length).toBe(2);
    });
  });
});