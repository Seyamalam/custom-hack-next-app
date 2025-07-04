import { AuroraText } from "@/components/magicui/aurora-text";
import BetterAuth from "@/components/better-auth";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userEmail = session?.user?.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold">API Whisperer</span>
        </div>
        <BetterAuth userEmail={userEmail} />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform boring{" "}
            <AuroraText colors={["#6600ff", "#69e300", "#80ffce"]}>
              API docs
            </AuroraText>{" "}
            into magic
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Stop drowning in tabs, cURL commands, and endless documentation. 
            The API Whisperer turns any API into a personalized, interactive playground 
            where you can chat, test, and generate code instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {session ? (
              <a href="/dashboard">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-lg">
                  Go to Dashboard
                </button>
              </a>
            ) : (
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                <p className="text-gray-600 mb-4">Sign in to start whispering to APIs</p>
                <BetterAuth userEmail={userEmail} />
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Living Guide</h3>
            <p className="text-gray-600">Ask questions in plain English and get immediate, accurate answers about any API.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Personal Coder</h3>
            <p className="text-gray-600">Get code snippets automatically generated in your preferred programming language.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Instant Playground</h3>
            <p className="text-gray-600">Test endpoints with interactive forms, no Postman setup required.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Guardian Angel</h3>
            <p className="text-gray-600">Get proactive email alerts about breaking API changes before they hit production.</p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">See the Magic in Action</h2>
          <p className="text-gray-600 mb-6">
            From confusing documentation to conversational development in seconds
          </p>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="text-left space-y-2 font-mono text-sm">
              <div className="text-purple-600">1. Paste API docs URL → Firecrawl scrapes everything</div>
              <div className="text-blue-600">2. Chat with Tambo AI → "How do I create an invoice for $99?"</div>
              <div className="text-green-600">3. Get perfect code → Python, Go, Rust, whatever you need</div>
              <div className="text-orange-600">4. Test instantly → Interactive forms, live responses</div>
            </div>
          </div>

          {session && (
            <a href="/dashboard">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Try It Now
              </button>
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
