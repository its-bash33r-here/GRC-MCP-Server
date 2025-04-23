import { McpServer } from './types/mcp';
import { GRCController } from './controllers/grc-controller';
import { ComplianceService } from './services/compliance-service';
import { validateAuth } from './utils/auth-utils';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const server = new McpServer({
    name: 'grc-mcp-server',
    description: 'MCP server for Governance, Risk, and Compliance operations',
    version: '1.0.0',
    auth: {
      type: 'bearer',
      validate: validateAuth,
    },
  });

  // Initialize services and controllers
  const complianceService = new ComplianceService();
  const grcController = new GRCController(complianceService);

  // Register GRC tools
  grcController.registerTools(server);

  // Start the server
  await server.listen();
  console.log('GRC MCP server is running');
}

main().catch(console.error);