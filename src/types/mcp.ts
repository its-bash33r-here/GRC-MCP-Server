export interface McpServerConfig {
    name: string;
    description: string;
    version: string;
    auth: {
        type: 'bearer';
        validate: (token: unknown) => boolean;
    };
}

export interface McpTool<T = unknown> {
    description: string;
    parameters: unknown;
    handler: (params: T) => Promise<unknown>;
}

export class McpServer {
    private tools = new Map<string, McpTool<unknown>>();

    constructor(private config: McpServerConfig) {}

    tool<T>(name: string, tool: McpTool<T>) {
        // Type assertion since we know the handler will be called with validated params
        this.tools.set(name, tool as McpTool<unknown>);
    }

    async listen(port = 3000) {
        console.log(`MCP Server ${this.config.name} v${this.config.version} starting...`);
        console.log(`Description: ${this.config.description}`);
        console.log(`Registered tools: ${Array.from(this.tools.keys()).join(', ')}`);
        console.log(`Listening on port ${port}`);
    }
}