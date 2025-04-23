import { readFileSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

// MCP Configuration Schema
const McpParameterSchema = z.object({
  type: z.string(),
  description: z.string(),
  format: z.string().optional(),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
  enum: z.array(z.string()).optional(),
  items: z.object({
    type: z.string()
  }).optional()
});

const McpToolOperationSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.record(McpParameterSchema).or(z.object({}))
});

const McpAuthConfigSchema = z.object({
  type: z.string(),
  description: z.string(),
  configuration: z.object({
    tokenHeader: z.string(),
    tokenPrefix: z.string()
  })
});

const McpToolSchema = z.object({
  create: McpToolOperationSchema.optional(),
  list: McpToolOperationSchema.optional(),
  update: McpToolOperationSchema.optional(),
  delete: McpToolOperationSchema.optional()
});

const McpConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  description: z.string(),
  tools: z.record(McpToolSchema),
  auth: McpAuthConfigSchema,
  examples: z.record(z.record(z.unknown()))
});

export type McpConfig = z.infer<typeof McpConfigSchema>;

export class McpConfigLoader {
  private static instance: McpConfigLoader;
  private config: McpConfig;

  private constructor() {
    const configPath = join(process.cwd(), '.vscode', 'mcp.json');
    const configFile = readFileSync(configPath, 'utf-8');
    this.config = McpConfigSchema.parse(JSON.parse(configFile));
  }

  public static getInstance(): McpConfigLoader {
    if (!McpConfigLoader.instance) {
      McpConfigLoader.instance = new McpConfigLoader();
    }
    return McpConfigLoader.instance;
  }

  public getConfig(): McpConfig {
    return this.config;
  }

  public getToolConfig(toolName: string) {
    return this.config.tools[toolName];
  }

  public getToolOperation(toolName: string, operation: 'create' | 'list' | 'update' | 'delete') {
    const tool = this.getToolConfig(toolName);
    return tool?.[operation];
  }

  public getExample(toolName: string, operation: string = 'create') {
    return this.config.examples[toolName]?.[operation];
  }

  public validateParameters(toolName: string, operation: string, params: unknown) {
    const tool = this.getToolOperation(toolName, operation as any);
    if (!tool) {
      throw new Error(`Tool ${toolName}.${operation} not found`);
    }

    const paramSchema = z.object(
      Object.entries(tool.parameters).reduce((acc, [key, param]) => {
        acc[key] = this.createZodSchema(param);
        return acc;
      }, {} as Record<string, z.ZodType>)
    );

    return paramSchema.parse(params);
  }

  private createZodSchema(param: z.infer<typeof McpParameterSchema>): z.ZodType {
    switch (param.type) {
      case 'string':
        let schema: z.ZodType = z.string();
        if (param.enum) {
          return z.enum(param.enum as [string, ...string[]]);
        }
        if (param.format === 'date-time') {
          schema = z.string().datetime();
        }
        return schema;
      case 'number':
        let numSchema = z.number();
        if (typeof param.minimum === 'number') {
          numSchema = numSchema.min(param.minimum);
        }
        if (typeof param.maximum === 'number') {
          numSchema = numSchema.max(param.maximum);
        }
        return numSchema;
      case 'array':
        if (param.items?.type === 'string') {
          return z.array(z.string());
        }
        return z.array(z.unknown());
      default:
        return z.unknown();
    }
  }
}