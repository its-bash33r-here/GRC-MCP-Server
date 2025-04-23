import { McpConfigLoader } from '../src/utils/mcp-config';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function main() {
    // Get MCP configuration
    const mcpConfig = McpConfigLoader.getInstance();

    // Example 1: Create a risk assessment using the example from mcp.json
    try {
        const riskExample = mcpConfig.getExample('risk-assessment');
        const validatedRisk = mcpConfig.validateParameters('risk-assessment', 'create', riskExample);
        console.log('Valid risk assessment:', validatedRisk);
    } catch (error) {
        console.error('Risk validation error:', error);
    }

    // Example 2: Create a custom compliance report
    try {
        const customReport = {
            title: "Custom Security Assessment",
            regulationId: "SEC-2025",
            status: "in-progress",
            findings: [
                "Firewall rules need updating",
                "Password policy requires enhancement"
            ]
        };
        const validatedReport = mcpConfig.validateParameters('compliance-report', 'create', customReport);
        console.log('Valid compliance report:', validatedReport);
    } catch (error) {
        console.error('Report validation error:', error);
    }

    // Example 3: Create a policy document with validation
    try {
        const policyDoc = {
            title: "Remote Access Policy",
            content: "Detailed VPN and remote access procedures...",
            version: "2.0.0",
            approvedBy: "IT Security Team",
            effectiveDate: new Date().toISOString(),
            reviewDate: new Date(Date.now() + 31536000000).toISOString() // One year from now
        };
        const validatedPolicy = mcpConfig.validateParameters('policy-document', 'create', policyDoc);
        console.log('Valid policy document:', validatedPolicy);
    } catch (error) {
        console.error('Policy validation error:', error);
    }

    // Example 4: Show available tools and their operations
    const config = mcpConfig.getConfig();
    console.log('\nAvailable Tools:');
    Object.entries(config.tools).forEach(([toolName, tool]) => {
        console.log(`\n${toolName}:`);
        Object.entries(tool).forEach(([operation, details]) => {
            console.log(`  ${operation}: ${details.description}`);
        });
    });
}

main().catch(console.error);