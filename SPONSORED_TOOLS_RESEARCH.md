# Sponsored Tools Research Documentation

## Project Overview
The API Whisperer is a hackathon project that transforms API documentation into an interactive, conversational development playground using 8 sponsored tools.

## Tool Documentation

### 1. Better Auth (Authentication)
**Website**: https://better-auth.com/
**Purpose**: Framework-agnostic authentication and authorization framework for TypeScript

**Key Features**:
- Framework-agnostic (works with any web framework)
- Email & password authentication
- Social sign-on (Google, GitHub, Apple, Discord, etc.)
- Two-factor authentication
- Session and account management
- Built-in rate limiting
- Plugin ecosystem
- TypeScript-first with full type safety
- Automatic database management and migrations

**Integration in API Whisperer**:
- GitHub OAuth authentication
- User session management
- Secure API key storage
- Role-based access control for different API workspaces

**Implementation**:
```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  emailAndPassword: { enabled: true },
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID!, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
    } 
  }
})
```

---

### 2. Supabase (Database & Backend)
**Website**: https://supabase.com/
**Purpose**: Open-source Firebase alternative with PostgreSQL database

**Key Features**:
- PostgreSQL database with real-time subscriptions
- Row Level Security (RLS)
- Auto-generated APIs
- File storage
- Edge functions
- Authentication (though we're using Better Auth)
- Dashboard and SQL editor

**Integration in API Whisperer**:
- PostgreSQL database for storing users, workspaces, API documentation data
- Real-time updates for collaborative features
- File storage for API documentation assets
- Database schemas for conversations, endpoints, and user data

**Tables Structure**:
```sql
-- Users table (managed by Better Auth)
-- API workspaces
-- Conversations
-- API endpoints
-- Documentation extracts
-- User preferences
```

---

### 3. Firecrawl (Web Scraping)
**Website**: https://firecrawl.dev/
**Purpose**: AI-powered web scraping and data extraction

**Key Features**:
- Converts web pages to clean markdown
- Handles JavaScript-rendered content
- Structured data extraction with schemas
- Batch scraping multiple URLs
- Screenshot capabilities
- Rate limiting and proxy handling
- Actions for interactive page navigation
- Stealth mode for anti-bot protection

**Integration in API Whisperer**:
- Scrape API documentation from URLs
- Extract structured information about endpoints, parameters, examples
- Convert documentation to LLM-friendly markdown format
- Handle dynamic documentation sites

**Implementation**:
```python
from firecrawl import FirecrawlApp

app = FirecrawlApp(api_key="fc-YOUR_API_KEY")

# Extract API documentation structure
result = app.scrape_url(
    'https://api.example.com/docs',
    formats=["json"],
    json_options={
        "schema": {
            "endpoints": "array",
            "parameters": "object",
            "examples": "array"
        }
    }
)
```

---

### 4. Tambo (Conversational AI)
**Website**: https://tambo.co/
**Purpose**: Build AI-powered apps where AI can render React components, not just text

**Key Features**:
- Register React components for AI to render
- Streaming support for UI components
- Message thread history
- AI-integrated state management
- Suggested actions for user guidance
- Decision loop for AI orchestration
- Component library for quick setup

**Integration in API Whisperer**:
- Conversational interface for API assistance
- AI can render interactive components for API testing
- Dynamic UI generation based on API documentation
- Custom tools for API endpoint testing, code generation

**Implementation**:
```tsx
import { createTamboClient } from 'tambo'

const tamboClient = createTamboClient({
  components: {
    APITestForm: APITestComponent,
    CodeSnippet: CodeSnippetComponent,
    EndpointCard: EndpointCardComponent
  }
})

// AI can now render these components in conversation
```

---

### 5. Magic UI (React Components)
**Website**: https://magicui.design/
**Purpose**: UI library for design engineers with 150+ animated components

**Key Features**:
- 150+ free React components
- Built with React, TypeScript, Tailwind CSS, and Motion
- Animated effects and special components
- Compatible with shadcn/ui
- Device mocks (iPhone, Android, Safari)
- Text animations (Aurora, gradient, morphing)
- Interactive buttons and backgrounds

**Integration in API Whisperer**:
- Beautiful landing page components
- Animated text effects (Aurora text for hero section)
- Interactive buttons and cards
- Loading animations and effects
- Modern UI components for dashboard

**Components Used**:
- Aurora Text for hero section
- Animated gradient cards
- Interactive hover buttons
- Dock component for navigation
- Marquee for testimonials
- Meteors and particle effects

---

### 6. Lingo.dev (Internationalization)
**Website**: https://lingo.dev/
**Purpose**: UI localization and internationalization platform

**Key Features**:
- Translate UI to multiple human languages
- Not for programming language translation, but for UI internationalization
- Support for German, Spanish, Hindi, French, etc.
- Translation management for UI components
- Real-time language switching

**Integration in API Whisperer**:
- Multi-language support for the application interface
- Translate UI elements to different languages
- Language switcher component
- Localized error messages and notifications
- Support for international developers

**Implementation**:
```tsx
import { useLingo } from '@lingo.dev/react'

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLingo()
  
  return (
    <select onChange={(e) => setLanguage(e.target.value)}>
      <option value="en">{t('english')}</option>
      <option value="es">{t('spanish')}</option>
      <option value="de">{t('german')}</option>
    </select>
  )
}
```

---

### 7. Resend (Email Service)
**Website**: https://resend.com/
**Purpose**: Email API for developers with React email templates

**Key Features**:
- Send transactional emails
- React email templates
- High deliverability
- Simple API integration
- Email analytics
- Domain verification
- Webhook support for email events

**Integration in API Whisperer**:
- Welcome emails for new users
- API change notifications
- Weekly digest of API updates
- Alert emails for API status changes
- Password reset and verification emails

**Implementation**:
```tsx
import { Resend } from 'resend'
import { EmailTemplate } from './components/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'API Whisperer <noreply@apiwhisperer.com>',
  to: ['user@example.com'],
  subject: 'API Documentation Updated',
  react: EmailTemplate({ apiName: 'Stripe API', changes: [...] })
})
```

---

### 8. Autumn (Billing & Payments)
**Website**: Unknown/Custom package
**Package**: autumn-js (billing framework)

**Key Features**:
- Usage-based billing system
- Freemium model support
- Payment processing integration
- Subscription management
- API usage tracking
- Billing analytics

**Integration in API Whisperer**:
- Freemium tier with limited API calls
- Premium subscriptions for unlimited usage
- Pay-per-API-call pricing model
- Usage analytics and billing dashboard
- Integration with Stripe for payment processing

**Note**: This appears to be a custom billing framework. The exact functionality needs to be determined from the package implementation or documentation.

---

## Tool Integration Summary

| Tool | Primary Function | Used For |
|------|------------------|----------|
| Better Auth | Authentication | GitHub OAuth, session management |
| Supabase | Database | User data, API docs, conversations |
| Firecrawl | Web Scraping | Extract API documentation |
| Tambo | Conversational AI | Chat interface with component rendering |
| Magic UI | UI Components | Beautiful animations and modern UI |
| Lingo.dev | Internationalization | Multi-language support |
| Resend | Email Service | Notifications and transactional emails |
| Autumn | Billing | Usage-based pricing and subscriptions |

## Architecture Flow

1. **User Authentication**: Better Auth handles GitHub OAuth
2. **Data Storage**: Supabase stores user profiles, workspaces, conversations
3. **API Documentation Extraction**: Firecrawl scrapes and parses API docs
4. **Conversational Interface**: Tambo provides AI chat with component rendering
5. **Beautiful UI**: Magic UI components create engaging interface
6. **Multi-language Support**: Lingo.dev handles UI translations
7. **Email Notifications**: Resend sends updates and alerts
8. **Billing Management**: Autumn handles usage tracking and payments

This architecture creates a comprehensive platform that transforms static API documentation into an interactive, conversational development experience while supporting multiple languages and usage-based billing.