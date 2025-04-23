import { GRCController } from './grc-controller';
import { ComplianceService } from '../services/compliance-service';
import { McpServer, McpTool } from '../types/mcp';

describe('GRCController', () => {
  let controller: GRCController;
  let complianceService: ComplianceService;
  let mockServer: jest.Mocked<McpServer>;

  beforeEach(() => {
    complianceService = new ComplianceService();
    controller = new GRCController(complianceService);
    mockServer = {
      tool: jest.fn()
    } as any;
  });

  it('should register all tools', () => {
    controller.registerTools(mockServer);
    
    // Verify all tools are registered
    expect(mockServer.tool).toHaveBeenCalledWith('createRiskAssessment', expect.any(Object));
    expect(mockServer.tool).toHaveBeenCalledWith('createComplianceReport', expect.any(Object));
    expect(mockServer.tool).toHaveBeenCalledWith('createPolicyDocument', expect.any(Object));
    expect(mockServer.tool).toHaveBeenCalledWith('listRiskAssessments', expect.any(Object));
    expect(mockServer.tool).toHaveBeenCalledWith('listComplianceReports', expect.any(Object));
    expect(mockServer.tool).toHaveBeenCalledWith('listPolicyDocuments', expect.any(Object));
  });

  it('should handle risk assessment creation through tool', async () => {
    controller.registerTools(mockServer);

    const createRiskTool = mockServer.tool.mock.calls.find(
      call => call[0] === 'createRiskAssessment'
    )?.[1] as McpTool;

    const riskData = {
      riskName: 'Test Risk',
      description: 'Test Description',
      category: 'Test',
      impact: 3,
      likelihood: 3,
      mitigationPlan: 'Test Plan',
      owner: 'Test Owner'
    };

    const result = await createRiskTool.handler(riskData);
    expect(result).toHaveProperty('riskId');
    expect(result).toHaveProperty('riskName', riskData.riskName);
  });

  it('should handle compliance report creation through tool', async () => {
    controller.registerTools(mockServer);

    const createReportTool = mockServer.tool.mock.calls.find(
      call => call[0] === 'createComplianceReport'
    )?.[1] as McpTool;

    const reportData = {
      title: 'Test Report',
      regulationId: 'REG-001',
      status: 'in-progress' as const,
      findings: ['Test Finding']
    };

    const result = await createReportTool.handler(reportData);
    expect(result).toHaveProperty('reportId');
    expect(result).toHaveProperty('title', reportData.title);
  });
});