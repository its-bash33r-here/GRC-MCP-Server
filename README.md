# GRC MCP Server

A Model Context Protocol (MCP) server for Governance, Risk, and Compliance (GRC) operations. This server provides a standardized interface for managing risk assessments, compliance reports, and policy documents in organizations.

## Overview

The GRC MCP Server is designed to help organizations manage their governance, risk, and compliance needs through a standardized API. It provides tools for:

- Risk Assessment Management
- Compliance Reporting
- Policy Document Management

## Features

### Risk Assessment Management
- Create and track risk assessments
- Evaluate risks with impact and likelihood scores (1-5)
- Assign ownership and track mitigation plans
- Set and monitor due dates

### Compliance Reporting
- Generate compliance reports for various regulations
- Track compliance status (compliant, non-compliant, in-progress)
- Document findings and observations
- Maintain audit trails with timestamps

### Policy Document Management
- Create and version policy documents
- Track document approvals
- Manage effective dates and review schedules
- Maintain policy history

## Use Cases

1. **Enterprise Risk Management**
   - Identify and assess operational risks
   - Track risk mitigation efforts
   - Generate risk reports for management
   ```typescript
   // Example: Creating a risk assessment
   const riskAssessment = {
     riskName: "Data Center Power Failure",
     description: "Risk of main data center power system failure",
     category: "Infrastructure",
     impact: 5,
     likelihood: 2,
     mitigationPlan: "Implement redundant power systems",
     owner: "Infrastructure Team",
     dueDate: "2025-06-30T00:00:00Z"
   };
   ```

2. **Regulatory Compliance**
   - Track compliance with industry regulations
   - Document compliance evidence
   - Manage compliance findings
   ```typescript
   // Example: Creating a compliance report
   const complianceReport = {
     title: "GDPR Annual Assessment",
     regulationId: "GDPR-2024",
     status: "in-progress",
     findings: [
       "Data retention policies need update",
       "Access controls require review"
     ]
   };
   ```

3. **Policy Management**
   - Centralize policy documentation
   - Track policy approvals and reviews
   - Manage policy lifecycle
   ```typescript
   // Example: Creating a policy document
   const policyDocument = {
     title: "Remote Work Security Policy",
     content: "Detailed policy content...",
     version: "1.0.0",
     approvedBy: "Security Committee",
     effectiveDate: "2025-05-01T00:00:00Z",
     reviewDate: "2026-05-01T00:00:00Z"
   };
   ```

## API Authentication

The server uses Bearer token authentication. Include your API key in requests:
```
Authorization: Bearer YOUR_API_KEY
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```
   API_KEY=your_api_key_here
   ```

3. Start development server:
   ```bash
   npm run dev:env
   ```

## Docker Deployment

Build and run with Docker:
```bash
npm run docker:build
npm run docker:run
```

## Testing

The server includes comprehensive test cases for all major functionality. Run tests with:
```bash
npm test
```

### Test Cases

1. **Risk Assessment Tests**
   - Create risk assessment with valid data
   - Validate risk impact/likelihood ranges
   - Update existing risk assessment
   - List all risk assessments
   - Delete risk assessment

2. **Compliance Report Tests**
   - Create compliance report
   - Update compliance status
   - Add findings to report
   - List all reports
   - Delete report

3. **Policy Document Tests**
   - Create policy document
   - Version control testing
   - Update policy content
   - List all policies
   - Delete policy

4. **Authentication Tests**
   - Valid API key authentication
   - Invalid API key rejection
   - Missing authentication header

## Integration Examples

### Risk Assessment Creation
```typescript
const response = await fetch('http://localhost:3000/api/risk-assessments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    riskName: "Supply Chain Disruption",
    description: "Risk of critical supplier failure",
    category: "Operations",
    impact: 4,
    likelihood: 3,
    mitigationPlan: "Develop backup suppliers",
    owner: "Procurement Team"
  })
});
```

### Compliance Report Query
```typescript
const response = await fetch('http://localhost:3000/api/compliance-reports', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const reports = await response.json();
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

ISC License