# 🎯 The API Whisperer

> **Transform boring API documentation into a personalized, interactive, and conversational development playground.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/api-whisperer)

## 🚀 The Big Idea

**TL;DR:** We're building a magic wand that transforms any static, boring API documentation into a personalized, interactive, and conversational development playground. Point it at a URL, and we do the rest.

### The Problem We're Solving

Let's be honest: integrating a new API is a soul-crushing ritual. You're drowning in a sea of tabs—the ancient scroll of API docs, your code editor, and the clunky Postman window. You perform the sacred "copy-paste-pray" dance with cURL commands, manually translate examples from Python to your stack's language, and hunt for that one missing parameter that's breaking everything.

**It's a flow-killer. It's tedious, error-prone, and makes innovation feel like a chore.**

### Our Solution

"The API Whisperer" is the co-pilot every developer wishes they had. It's a single, intelligent workspace that turns the API integration nightmare into a seamless, creative process.

**Give it a URL, and it gives you:**

✨ **A Living Guide:** Ask questions in plain English and get immediate, accurate answers  
🤖 **Your Personal Coder:** Get code snippets automatically generated in your preferred language  
🎮 **An Instant Playground:** Test endpoints with interactive forms, no setup required  
👼 **A Guardian Angel:** Get proactive email alerts about breaking changes before they hit production

## 🏗️ Architecture & Tech Stack

This project integrates **8 sponsored tools** into a cohesive system where every piece is essential:

### Core Integration Stack

| Tool | Purpose | Role in API Whisperer |
|------|---------|----------------------|
| **🔐 Better Auth** | Authentication | VIP entrance with GitHub OAuth + personalization |
| **🗄️ Supabase** | Database | Project's memory for users, APIs, conversations |
| **🕷️ Firecrawl** | Web Scraping | Knowledge inhaler that transforms docs into structured data |
| **🤖 Tambo.co** | Conversational AI | Interactive heart - chat about APIs, generate forms |
| **🎨 Magic UI** | Components | Sleek interface with beautiful React components |
| **🌍 Lingo.dev** | Translation | Universal translator for code & UI localization |
| **📧 Resend** | Email | Proactive messenger for alerts & notifications |
| **💰 useautumn.com** | Billing | Smart paywall with usage-based pricing |

### Framework & Tools

- **Next.js 15** with App Router & React 19
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Prisma** for database ORM
- **PostgreSQL** via Supabase

## 🎬 The "Wow" Demo Flow

1. **Before:** Show a dense, confusing, real-world API documentation page
2. **Login:** Sign in to "API Whisperer" with GitHub using Better Auth
3. **The Magic:** Paste the docs URL. Firecrawl extracts everything in the background
4. **The Conversation:** Tambo chat appears. Type: *"How do I create an invoice for customer 'cus_123' for $99?"*
5. **The Result:** Watch it generate a perfect Python code snippet and an interactive Magic UI form
6. **The Twist:** Click a dropdown and select "Go." The code seamlessly "translates" using Lingo.dev
7. **The Test:** Click "Run Test." See the live JSON response
8. **The Upgrade:** Try to add another API and watch the Autumn paywall appear

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database (Supabase recommended)
- API keys for the integrated services

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/api-whisperer
cd api-whisperer
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Fill in your API keys in `.env`:

```env
# Required for basic functionality
BETTER_AUTH_SECRET=your_secret_here
DATABASE_URL=your_supabase_url
FIRECRAWL_API_KEY=your_firecrawl_key
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key

# Optional but recommended
RESEND_API_KEY=your_resend_key
AUTUMN_SECRET_KEY=your_autumn_key
LINGODOTDEV_API_KEY=your_lingo_key
```

### 3. Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Start Development

```bash
pnpm dev
```

Visit `http://localhost:3000` and start whispering to APIs! 🎉

## 🔑 Getting API Keys

### Essential Keys (Demo Ready)

1. **Supabase** - [supabase.com](https://supabase.com)
   - Create project → Settings → Database → Copy connection string

2. **Firecrawl** - [firecrawl.dev](https://firecrawl.dev)
   - Sign up → Get API key for web scraping

3. **Tambo** - [tambo.co](https://tambo.co)
   - Create account → API keys → Copy public key

4. **Better Auth** - Generate locally
   ```bash
   openssl rand -base64 32
   ```

### Enhanced Experience Keys

5. **Resend** - [resend.com](https://resend.com)
   - For email notifications

6. **Autumn** - [useautumn.com](https://useautumn.com)
   - For usage-based billing

7. **Lingo.dev** - [lingo.dev](https://lingo.dev)
   - For code translation & localization

## 🎯 Key Features

### 🔍 Intelligent API Documentation Parsing
- **Firecrawl** scrapes any API docs URL
- Extracts endpoints, parameters, authentication methods
- Creates structured knowledge base for AI conversations

### 💬 Conversational API Assistant
- **Tambo AI** provides context-aware responses
- Ask questions like "How do I authenticate?" or "Show me pagination examples"
- Get instant, accurate answers about any API

### 🛠️ Interactive Endpoint Testing
- Auto-generated forms for every API endpoint
- Test with real parameters and see live responses
- No Postman or curl commands needed

### ⚡ Multi-Language Code Generation
- **Lingo.dev** translates code between languages
- Generate snippets in Python, Go, Rust, JavaScript, etc.
- Perfect syntax for your preferred stack

### 📧 Proactive API Monitoring
- **Resend** sends alerts for API changes
- Get notified about breaking changes before they hit production
- Usage limit warnings and update notifications

### 💰 Smart Usage-Based Billing
- **Autumn** handles freemium model
- Free tier: 1 workspace, 100 test calls/month
- Automatic scaling for Pro and Team plans

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── dashboard/               # User dashboard
│   ├── workspace/[api]/         # API-specific workspaces
│   └── page.tsx                 # Landing page
├── components/
│   ├── api-whisperer/          # Project-specific components
│   │   ├── firecrawl-api-scraper.tsx
│   │   └── tambo-chat.tsx
│   ├── better-auth/            # Authentication components
│   ├── firecrawl/              # Web scraping components
│   ├── tambo/                  # AI chat components
│   ├── resend/                 # Email components
│   ├── autumn/                 # Payment components
│   └── magicui/                # UI components
└── lib/
    ├── auth.ts                 # Better Auth configuration
    └── tambo/                  # Tambo AI tools & components
```

## 🎨 UI Components

The project uses **Magic UI** for beautiful, modern React components:

- **Aurora Text** - Animated gradient text effects
- **Interactive Forms** - Dynamic API endpoint testing
- **Glass Morphism** - Modern backdrop blur effects
- **Responsive Design** - Mobile-first approach

## 🔐 Authentication

**Better Auth** provides:
- GitHub OAuth integration
- Secure session management
- User profile extraction from GitHub repos
- Automatic language preference detection

## 🤖 AI Integration

**Tambo AI** powers:
- Context-aware API conversations
- Dynamic component rendering
- Tool integration for endpoint testing
- Code generation assistance

## 📊 Database Schema

Powered by **Supabase + Prisma**:

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  workspaces  Workspace[]
  conversations Conversation[]
}

model Workspace {
  id          String   @id @default(cuid())
  name        String
  apiUrl      String
  endpoints   Json
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}

model Conversation {
  id          String   @id @default(cuid())
  messages    Json
  workspaceId String
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy! 🎉

### Docker

```bash
docker build -t api-whisperer .
docker run -p 3000:3000 api-whisperer
```

## 🏆 Hackathon Highlights

### Perfect Demo Script

1. **Problem Introduction** (30s)
   - Show frustrating API integration experience

2. **Solution Demo** (2 minutes)
   - Live API documentation scraping
   - Conversational AI interaction
   - Code generation in multiple languages
   - Interactive endpoint testing

3. **Technology Integration** (1 minute)
   - Highlight all 8 sponsored tools working together
   - Show seamless user experience

### What Makes This Special

- **Real-world Problem:** Every developer has felt this pain
- **Comprehensive Solution:** Not just one feature, but an entire workflow
- **Perfect Tool Integration:** Each sponsored tool has a clear, essential role
- **Immediate Value:** Developers can use this right away

## 🤝 Contributing

We'd love your help making API integration magical! Check out:

- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Development Setup](docs/development.md)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Special thanks to all the sponsored tool providers:
- Better Auth, Supabase, Firecrawl, Tambo.co
- Magic UI, Lingo.dev, Resend, useautumn.com

---

**Built with ❤️ for developers who deserve better API experiences.**

[🌟 Star this repo](https://github.com/yourusername/api-whisperer) | [🐛 Report Bug](https://github.com/yourusername/api-whisperer/issues) | [💡 Request Feature](https://github.com/yourusername/api-whisperer/issues)
