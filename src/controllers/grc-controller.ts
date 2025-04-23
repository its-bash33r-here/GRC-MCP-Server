import { ComplianceService } from '../services/compliance-service';
import { RiskAssessmentSchema, ComplianceReportSchema, PolicyDocumentSchema } from '../models/compliance-models';

export interface McpTool<T = unknown> {
    description: string;
    parameters: unknown;
    handler: (params: T) => Promise<unknown>;
}

export interface McpServer {
    tool: <T>(name: string, tool: McpTool<T>) => void;
}

export class GRCController {
    constructor(private complianceService: ComplianceService) {}

    registerTools(server: McpServer) {
        // Risk Assessment Tool
        server.tool('createRiskAssessment', {
            description: 'Create a new risk assessment',
            parameters: RiskAssessmentSchema,
            handler: async (params) => {
                return await this.complianceService.createRiskAssessment(params);
            }
        });

        // Compliance Report Tool
        server.tool('createComplianceReport', {
            description: 'Create a new compliance report',
            parameters: ComplianceReportSchema,
            handler: async (params) => {
                return await this.complianceService.createComplianceReport(params);
            }
        });

        // Policy Document Tool
        server.tool('createPolicyDocument', {
            description: 'Create a new policy document',
            parameters: PolicyDocumentSchema,
            handler: async (params) => {
                return await this.complianceService.createPolicyDocument(params);
            }
        });

        // List Risk Assessments Tool
        server.tool('listRiskAssessments', {
            description: 'Get all risk assessments',
            parameters: {},
            handler: async () => {
                return await this.complianceService.getRiskAssessments();
            }
        });

        // List Compliance Reports Tool
        server.tool('listComplianceReports', {
            description: 'Get all compliance reports',
            parameters: {},
            handler: async () => {
                return await this.complianceService.getComplianceReports();
            }
        });

        // List Policy Documents Tool
        server.tool('listPolicyDocuments', {
            description: 'Get all policy documents',
            parameters: {},
            handler: async () => {
                return await this.complianceService.getPolicyDocuments();
            }
        });
    }
}