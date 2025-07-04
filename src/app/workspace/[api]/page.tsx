import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuroraText } from "@/components/magicui/aurora-text";
import BetterAuth from "@/components/better-auth";
import TamboChat from "@/components/tambo/chat";
import APIEndpointTester from "@/components/api-whisperer/endpoint-tester";
import CodeGenerator from "@/components/api-whisperer/code-generator";

interface WorkspacePageProps {
  params: Promise<{
    api: string;
  }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { api } = await params;
  const userEmail = session?.user?.email;
  const apiName = api.charAt(0).toUpperCase() + api.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-white/20">
        <div className="flex items-center space-x-4">
          <a href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold">API Whisperer</span>
          </a>
          <span className="text-gray-400">/</span>
          <h1 className="text-xl font-semibold">
            <AuroraText colors={["#6600ff", "#69e300", "#80ffce"]}>
              {apiName} API
            </AuroraText>
          </h1>
        </div>
        <BetterAuth userEmail={userEmail} />
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 h-[calc(100vh-200px)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-purple-800">
                  Chat with {apiName} API Assistant
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">AI Ready</span>
                </div>
              </div>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  <strong>Pro tip:</strong> Ask me anything about the {apiName} API! 
                  Try: "How do I authenticate?", "Show me how to create a customer", 
                  or "What's the rate limit?"
                </p>
              </div>

              <TamboChat apiContext={api} />
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors">
                  <div className="font-medium text-purple-800">Test Endpoint</div>
                  <div className="text-sm text-purple-600">Interactive API testing</div>
                </button>
                
                <button className="w-full text-left p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                  <div className="font-medium text-blue-800">Generate Code</div>
                  <div className="text-sm text-blue-600">Get snippets in any language</div>
                </button>
                
                <button className="w-full text-left p-3 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
                  <div className="font-medium text-green-800">View Documentation</div>
                  <div className="text-sm text-green-600">Browse extracted docs</div>
                </button>
              </div>
            </div>

            {/* API Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">API Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium">✓ Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Endpoints:</span>
                  <span className="font-medium">42 found</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last updated:</span>
                  <span className="font-medium">2 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tests run:</span>
                  <span className="font-medium">127 this month</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-purple-500 pl-3">
                  <div className="font-medium">Generated Python code</div>
                  <div className="text-gray-600">Create customer endpoint</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
                
                <div className="border-l-2 border-blue-500 pl-3">
                  <div className="font-medium">Tested POST /payments</div>
                  <div className="text-gray-600">Successful response</div>
                  <div className="text-xs text-gray-500">1 day ago</div>
                </div>
                
                <div className="border-l-2 border-green-500 pl-3">
                  <div className="font-medium">Asked about webhooks</div>
                  <div className="text-gray-600">Webhook configuration help</div>
                  <div className="text-xs text-gray-500">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}