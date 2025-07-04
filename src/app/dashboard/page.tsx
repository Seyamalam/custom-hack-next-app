import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuroraText } from "@/components/magicui/aurora-text";
import BetterAuth from "@/components/better-auth";
import FirecrawlAPIScraper from "@/components/api-whisperer/firecrawl-api-scraper";
import Autumn from "@/components/autumn";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const userEmail = session?.user?.email;
  const userName = session?.user?.name || userEmail?.split("@")[0] || "Developer";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-white/20">
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"></div>
            <span className="text-xl font-bold">API Whisperer</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Autumn />
          <BetterAuth userEmail={userEmail} />
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back,{" "}
            <AuroraText colors={["#6600ff", "#69e300", "#80ffce"]}>
              {userName}
            </AuroraText>
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to whisper to some APIs? Add documentation URLs below to get started.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Add New API */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
            <FirecrawlAPIScraper />
          </div>

          {/* Recent Workspaces */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Your API Workspaces
            </h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-white/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">Stripe API</h3>
                    <p className="text-sm text-gray-600">Payment processing & subscriptions</p>
                    <p className="text-xs text-gray-500 mt-1">Last updated: 2 days ago</p>
                  </div>
                  <a 
                    href="/workspace/stripe" 
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Open
                  </a>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:bg-white/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">OpenAI API</h3>
                    <p className="text-sm text-gray-600">AI and machine learning endpoints</p>
                    <p className="text-xs text-gray-500 mt-1">Last updated: 1 week ago</p>
                  </div>
                  <a 
                    href="/workspace/openai" 
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Open
                  </a>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-gray-500">Add your first API workspace above to get started</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Overview */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">What You Can Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
              <p className="text-gray-600">
                "How do I authenticate?" "What's the rate limit?" 
                Get instant answers about any API.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Test Endpoints</h3>
              <p className="text-gray-600">
                Interactive forms for every endpoint. No Postman needed. 
                Test with real data instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Code</h3>
              <p className="text-gray-600">
                Get perfect code snippets in Python, Go, Rust, JavaScript, 
                or any language you prefer.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}