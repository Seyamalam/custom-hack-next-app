"use client";

import { useState } from "react";
import Section from "../common/section";

interface APIScrapeResult {
  url: string;
  title: string;
  endpoints: Array<{
    method: string;
    path: string;
    description: string;
    parameters: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
    }>;
  }>;
  authentication: {
    type: string;
    description: string;
  };
  baseUrl: string;
  rateLimit: string;
}

export default function FirecrawlAPIScraper() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<APIScrapeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API scraping (in real implementation, this would call Firecrawl API)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock result based on URL
      const mockResult: APIScrapeResult = {
        url,
        title: url.includes("stripe") ? "Stripe API" : url.includes("openai") ? "OpenAI API" : "API Documentation",
        endpoints: [
          {
            method: "POST",
            path: "/v1/customers",
            description: "Create a new customer",
            parameters: [
              { name: "email", type: "string", required: true, description: "Customer email address" },
              { name: "name", type: "string", required: false, description: "Customer name" },
              { name: "metadata", type: "object", required: false, description: "Additional customer data" }
            ]
          },
          {
            method: "GET",
            path: "/v1/customers/{id}",
            description: "Retrieve a customer",
            parameters: [
              { name: "id", type: "string", required: true, description: "Customer ID" }
            ]
          },
          {
            method: "POST",
            path: "/v1/charges",
            description: "Create a charge",
            parameters: [
              { name: "amount", type: "integer", required: true, description: "Amount in cents" },
              { name: "currency", type: "string", required: true, description: "Currency code" },
              { name: "customer", type: "string", required: false, description: "Customer ID" }
            ]
          }
        ],
        authentication: {
          type: "Bearer Token",
          description: "Include your secret key in the Authorization header"
        },
        baseUrl: url.includes("stripe") ? "https://api.stripe.com" : "https://api.example.com",
        rateLimit: "100 requests per second"
      };

      setResult(mockResult);
    } catch (err) {
      setError("Failed to scrape API documentation. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateWorkspace = () => {
    if (!result) return;
    
    // In real implementation, this would save to database and redirect
    const apiSlug = result.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    window.location.href = `/workspace/${apiSlug}`;
  };

  if (result) {
    return (
      <Section title="API Documentation Extracted">
        <div className="space-y-6">
          {/* Success Header */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-800">{result.title}</h3>
                <p className="text-green-600">Successfully extracted {result.endpoints.length} endpoints</p>
              </div>
              <button
                onClick={handleCreateWorkspace}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Workspace
              </button>
            </div>
          </div>

          {/* API Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold mb-3">API Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base URL:</span>
                  <span className="font-mono">{result.baseUrl}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Authentication:</span>
                  <span>{result.authentication.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate Limit:</span>
                  <span>{result.rateLimit}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold mb-3">What You Can Do Next</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Chat with AI about this API</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Test endpoints interactively</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Generate code in any language</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Endpoints Preview */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold mb-3">Discovered Endpoints</h4>
            <div className="space-y-3">
              {result.endpoints.slice(0, 3).map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                        endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                        endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-sm">{endpoint.path}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{endpoint.description}</p>
                  </div>
                  <span className="text-xs text-gray-500">{endpoint.parameters.length} params</span>
                </div>
              ))}
              {result.endpoints.length > 3 && (
                <p className="text-sm text-gray-500 text-center">
                  +{result.endpoints.length - 3} more endpoints
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setResult(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Scrape Another API
            </button>
            <button
              onClick={handleCreateWorkspace}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Working with This API
            </button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Add API Documentation">
      <div className="space-y-4">
        <div>
          <label htmlFor="api-url" className="block text-sm font-medium text-gray-700 mb-2">
            API Documentation URL
          </label>
          <input
            id="api-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://docs.stripe.com/api, https://platform.openai.com/docs/api-reference, etc."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleScrape}
          disabled={isLoading || !url.trim()}
          className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Extracting API Documentation...</span>
            </>
          ) : (
            <span>Extract API Documentation</span>
          )}
        </button>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Firecrawl will scan the documentation page</li>
            <li>• Extract all endpoints, parameters, and examples</li>
            <li>• Create a structured knowledge base for AI chat</li>
            <li>• Set up your personalized API workspace</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}