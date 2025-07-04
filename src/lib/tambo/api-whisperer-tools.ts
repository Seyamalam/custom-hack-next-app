import { z } from "zod";

// API Endpoint Testing Tool
export const apiEndpointTesterTool = {
  name: "api_endpoint_tester",
  description: "Test an API endpoint with parameters and return the response",
  parameters: z.object({
    method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).describe("HTTP method"),
    endpoint: z.string().describe("API endpoint path (e.g., /v1/customers)"),
    baseUrl: z.string().describe("Base URL of the API"),
    headers: z.record(z.string()).optional().describe("HTTP headers as key-value pairs"),
    body: z.record(z.any()).optional().describe("Request body for POST/PUT requests"),
    parameters: z.record(z.string()).optional().describe("Query parameters"),
  }),
  execute: async ({
    method,
    endpoint,
    baseUrl,
    headers = {},
    body,
    parameters,
  }: {
    method: string;
    endpoint: string;
    baseUrl: string;
    headers?: Record<string, string>;
    body?: Record<string, any>;
    parameters?: Record<string, string>;
  }) => {
    try {
      // Build URL with parameters
      const url = new URL(endpoint, baseUrl);
      if (parameters) {
        Object.entries(parameters).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      // Prepare fetch options
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
        options.body = JSON.stringify(body);
      }

      // Make the request (in real implementation, this would be proxied through a backend)
      // For demo purposes, we'll return a mock response
      const mockResponse = {
        status: 200,
        statusText: "OK",
        data: {
          message: "Mock API response for demo",
          endpoint: endpoint,
          method: method,
          timestamp: new Date().toISOString(),
          parameters: parameters || {},
          body: body || null,
        },
        headers: {
          "content-type": "application/json",
          "x-ratelimit-remaining": "99",
        },
      };

      return {
        success: true,
        response: mockResponse,
        formattedResponse: `✅ **${method} ${endpoint}** - Status: ${mockResponse.status}\n\n\`\`\`json\n${JSON.stringify(mockResponse.data, null, 2)}\n\`\`\``,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        formattedResponse: `❌ **API Test Failed**\n\nError: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
};

// Code Generator Tool
export const codeGeneratorTool = {
  name: "code_generator",
  description: "Generate code snippets for API integration in various programming languages",
  parameters: z.object({
    language: z.enum(["python", "javascript", "go", "rust", "curl", "php", "java", "csharp"]).describe("Programming language"),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]).describe("HTTP method"),
    endpoint: z.string().describe("API endpoint path"),
    baseUrl: z.string().describe("Base URL of the API"),
    authType: z.enum(["bearer", "apikey", "basic", "none"]).optional().describe("Authentication type"),
    parameters: z.record(z.string()).optional().describe("Query parameters"),
    body: z.record(z.any()).optional().describe("Request body"),
  }),
  execute: async ({
    language,
    method,
    endpoint,
    baseUrl,
    authType = "none",
    parameters,
    body,
  }: {
    language: string;
    method: string;
    endpoint: string;
    baseUrl: string;
    authType?: string;
    parameters?: Record<string, string>;
    body?: Record<string, any>;
  }) => {
    const fullUrl = `${baseUrl}${endpoint}`;
    
    const codeTemplates = {
      python: `import requests
import json

# API configuration
url = "${fullUrl}"
headers = {
    "Content-Type": "application/json"${authType === "bearer" ? ',\n    "Authorization": "Bearer YOUR_API_KEY"' : ""}
}

${parameters ? `# Query parameters\nparams = ${JSON.stringify(parameters, null, 4)}` : ""}
${body ? `\n# Request body\nbody = ${JSON.stringify(body, null, 4)}` : ""}

# Make the request
response = requests.${method.toLowerCase()}(
    url${parameters ? ",\n    params=params" : ""}${body ? ",\n    json=body" : ""},
    headers=headers
)

# Handle the response
if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=2))
else:
    print(f"Error: {response.status_code} - {response.text}")`,

      javascript: `// API configuration
const url = "${fullUrl}";
const headers = {
    "Content-Type": "application/json"${authType === "bearer" ? ',\n    "Authorization": "Bearer YOUR_API_KEY"' : ""}
};

${parameters ? `// Query parameters\nconst params = new URLSearchParams(${JSON.stringify(parameters, null, 4)});` : ""}
${body ? `\n// Request body\nconst body = ${JSON.stringify(body, null, 4)};` : ""}

// Make the request
async function apiCall() {
    try {
        const response = await fetch(\`\${url}${parameters ? '?${params}' : ""}\`, {
            method: "${method}",
            headers: headers${body ? ",\n            body: JSON.stringify(body)" : ""}
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error(\`Error: \${response.status} - \${response.statusText}\`);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
}

apiCall();`,

      curl: `curl -X ${method} \\
  "${fullUrl}${parameters ? `?${new URLSearchParams(parameters).toString()}` : ""}" \\
  -H "Content-Type: application/json"${authType === "bearer" ? ' \\\n  -H "Authorization: Bearer YOUR_API_KEY"' : ""}${body ? ` \\\n  -d '${JSON.stringify(body)}'` : ""}`,

      go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "net/url"
)

func main() {
    // API configuration
    baseURL := "${fullUrl}"
    
    ${parameters ? `// Add query parameters\nu, _ := url.Parse(baseURL)\nq := u.Query()\n${Object.entries(parameters || {}).map(([key, value]) => `q.Add("${key}", "${value}")`).join('\n')}\nu.RawQuery = q.Encode()\nbaseURL = u.String()` : ""}

    ${body ? `// Request body\nbody := map[string]interface{}${JSON.stringify(body).replace(/"/g, '"')}\nbodyBytes, _ := json.Marshal(body)\n` : ""}

    // Create request
    req, err := http.NewRequest("${method}", baseURL, ${body ? "bytes.NewBuffer(bodyBytes)" : "nil"})
    if err != nil {
        panic(err)
    }

    // Set headers
    req.Header.Set("Content-Type", "application/json")
    ${authType === "bearer" ? 'req.Header.Set("Authorization", "Bearer YOUR_API_KEY")' : ""}

    // Make request
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    // Read response
    responseBody, _ := io.ReadAll(resp.Body)
    fmt.Printf("Status: %s\\n", resp.Status)
    fmt.Printf("Response: %s\\n", string(responseBody))
}`,
    };

    const code = codeTemplates[language as keyof typeof codeTemplates] || `# Code generation for ${language} not yet implemented`;

    return {
      success: true,
      language,
      code,
      formattedResponse: `🚀 **Generated ${language.toUpperCase()} code for ${method} ${endpoint}**\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n_Copy this code and replace YOUR_API_KEY with your actual API key._`,
    };
  },
};

// API Documentation Search Tool
export const apiDocSearchTool = {
  name: "api_doc_search",
  description: "Search through API documentation to find specific information about endpoints, authentication, or parameters",
  parameters: z.object({
    query: z.string().describe("Search query (e.g., 'authentication', 'rate limits', 'pagination')"),
    apiName: z.string().describe("Name of the API being searched"),
  }),
  execute: async ({ query, apiName }: { query: string; apiName: string }) => {
    // In real implementation, this would search through the scraped documentation
    // For demo, we'll return mock results based on common queries
    
    const mockResults = {
      authentication: {
        title: "Authentication",
        content: `The ${apiName} API uses Bearer token authentication. Include your API key in the Authorization header:

\`Authorization: Bearer sk_live_...\`

You can find your API keys in your dashboard under the API section.`,
        examples: [
          'curl -H "Authorization: Bearer sk_live_..." https://api.example.com/v1/endpoint'
        ]
      },
      "rate limits": {
        title: "Rate Limits",
        content: `The ${apiName} API enforces rate limits to ensure fair usage:

• **Standard**: 100 requests per minute
• **Premium**: 1000 requests per minute
• **Enterprise**: Custom limits

Rate limit information is included in response headers:
• \`X-RateLimit-Limit\`: Maximum requests allowed
• \`X-RateLimit-Remaining\`: Requests remaining in current window`,
      },
      pagination: {
        title: "Pagination",
        content: `${apiName} API uses cursor-based pagination for list endpoints:

**Parameters:**
• \`limit\`: Number of items to return (max 100)
• \`starting_after\`: Cursor for pagination

**Response includes:**
• \`has_more\`: Boolean indicating if more data exists
• \`data\`: Array of objects`,
        examples: [
          'GET /v1/customers?limit=10&starting_after=cus_abc123'
        ]
      }
    };

    const result = mockResults[query.toLowerCase() as keyof typeof mockResults] || {
      title: "Search Results",
      content: `Found information about "${query}" in the ${apiName} API documentation. Here are the key points:

• Check the main documentation for detailed information
• Look for examples in the API reference
• Consider checking the SDK documentation for your language`,
    };

    return {
      success: true,
      query,
      result,
      formattedResponse: `📚 **${result.title}** (${apiName} API)\n\n${result.content}${result.examples ? `\n\n**Examples:**\n${result.examples.map(ex => `\`${ex}\``).join('\n')}` : ""}`,
    };
  },
};

// Workspace Management Tool
export const workspaceManagerTool = {
  name: "workspace_manager",
  description: "Manage API workspaces - create, update, or get information about workspaces",
  parameters: z.object({
    action: z.enum(["create", "update", "get", "list"]).describe("Action to perform"),
    workspaceName: z.string().optional().describe("Name of the workspace"),
    apiUrl: z.string().optional().describe("URL of the API documentation"),
    description: z.string().optional().describe("Description of the workspace"),
  }),
  execute: async ({
    action,
    workspaceName,
    apiUrl,
    description,
  }: {
    action: string;
    workspaceName?: string;
    apiUrl?: string;
    description?: string;
  }) => {
    // In real implementation, this would interact with the database
    // For demo, we'll return mock responses
    
    switch (action) {
      case "create":
        return {
          success: true,
          workspace: {
            id: "ws_" + Math.random().toString(36).substr(2, 9),
            name: workspaceName,
            apiUrl,
            description,
            createdAt: new Date().toISOString(),
          },
          formattedResponse: `✅ **Workspace Created Successfully**\n\n📁 **${workspaceName}**\n${description}\n\n🔗 API: ${apiUrl}\n\nYou can now start chatting about this API and testing endpoints!`,
        };

      case "list":
        const mockWorkspaces = [
          { name: "Stripe API", description: "Payment processing", lastUsed: "2 days ago" },
          { name: "OpenAI API", description: "AI and machine learning", lastUsed: "1 week ago" },
        ];
        
        return {
          success: true,
          workspaces: mockWorkspaces,
          formattedResponse: `📂 **Your API Workspaces**\n\n${mockWorkspaces.map(ws => `• **${ws.name}** - ${ws.description} (${ws.lastUsed})`).join('\n')}\n\nClick on any workspace to open it and start working with that API.`,
        };

      default:
        return {
          success: false,
          error: "Invalid action",
          formattedResponse: "❌ Invalid workspace action specified.",
        };
    }
  },
};

// Export all tools
export const apiWhispererTools = [
  apiEndpointTesterTool,
  codeGeneratorTool,
  apiDocSearchTool,
  workspaceManagerTool,
];