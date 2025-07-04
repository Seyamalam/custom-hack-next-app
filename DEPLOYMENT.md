# 🚀 Deployment Guide - API Whisperer

This guide will help you deploy The API Whisperer to production for your hackathon demo or real-world usage.

## 🎯 Quick Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/api-whisperer)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "feat: initial API Whisperer setup"
git push origin main
```

### Step 2: Connect to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select your API Whisperer repository
5. Vercel will auto-detect Next.js configuration

### Step 3: Configure Environment Variables

In your Vercel dashboard, go to Settings → Environment Variables and add:

#### 🔑 Required Variables

```env
# Authentication
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=https://your-domain.vercel.app

# Database
DATABASE_URL=postgresql://user:pass@host:port/db
DIRECT_URL=postgresql://user:pass@host:port/db

# AI & Web Scraping
FIRECRAWL_API_KEY=fc-your_firecrawl_key
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_key

# Production Settings
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### ✨ Optional Variables (Enhanced Features)

```env
# Email Notifications
RESEND_API_KEY=re_your_resend_key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Billing
AUTUMN_SECRET_KEY=your_autumn_key

# Localization
LINGODOTDEV_API_KEY=your_lingo_key
GROQ_API_KEY=your_groq_key

# OAuth (Optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Step 4: Deploy!

Click "Deploy" and Vercel will:
- Build your Next.js application
- Set up automatic deployments from GitHub
- Provide you with a production URL

## 🗄️ Database Setup (Supabase)

### 1. Create Supabase Project

1. Visit [supabase.com](https://supabase.com)
2. Create new project
3. Wait for project setup (2-3 minutes)

### 2. Get Connection Strings

1. Go to Settings → Database
2. Copy the connection string
3. Replace `[YOUR-PASSWORD]` with your actual password
4. Use this for both `DATABASE_URL` and `DIRECT_URL`

### 3. Run Migrations

After deploying to Vercel:

```bash
# Clone your deployed project locally
git clone https://github.com/yourusername/api-whisperer
cd api-whisperer

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env
# Edit .env with your production values

# Run database migrations
pnpm prisma migrate deploy
```

## 🔐 API Keys Setup Guide

### Supabase (Database)
1. [Create project](https://supabase.com) → Settings → Database
2. Copy connection string

### Firecrawl (Web Scraping)
1. [Sign up](https://firecrawl.dev) → Dashboard
2. Get API key from dashboard

### Tambo (Conversational AI)
1. [Create account](https://tambo.co) → API Keys
2. Copy public API key (starts with `tam_`)

### Better Auth (Authentication)
Generate a secure secret:
```bash
openssl rand -base64 32
```

### Resend (Email) - Optional
1. [Sign up](https://resend.com) → API Keys
2. Add and verify your domain
3. Create API key

### Autumn (Billing) - Optional
1. [Sign up](https://useautumn.com) → API Keys
2. Connect Stripe account
3. Create API key

### Lingo.dev (Translation) - Optional
1. [Sign up](https://lingo.dev) → API Keys
2. Create project and get API key

## 🌐 Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to your project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### 2. Update Environment Variables

```env
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### 3. Configure Resend (if using)

1. Add your domain in Resend dashboard
2. Verify DNS records
3. Update `RESEND_FROM_EMAIL` to use your domain

## 🐳 Docker Deployment

If you prefer Docker deployment:

### 1. Build Image

```bash
docker build -t api-whisperer .
```

### 2. Run Container

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=your_db_url \
  -e FIRECRAWL_API_KEY=your_key \
  -e NEXT_PUBLIC_TAMBO_API_KEY=your_key \
  -e BETTER_AUTH_SECRET=your_secret \
  -e BETTER_AUTH_URL=http://localhost:3000 \
  api-whisperer
```

### 3. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  api-whisperer:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - FIRECRAWL_API_KEY=${FIRECRAWL_API_KEY}
      - NEXT_PUBLIC_TAMBO_API_KEY=${NEXT_PUBLIC_TAMBO_API_KEY}
      - BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
      - BETTER_AUTH_URL=http://localhost:3000
    env_file:
      - .env
```

Run with:
```bash
docker-compose up -d
```

## 🔍 Health Checks & Monitoring

### 1. Health Check Endpoint

The app includes a health check at `/api/health`:

```bash
curl https://yourdomain.com/api/health
```

### 2. Vercel Analytics (Optional)

Add to your environment variables:
```env
VERCEL_ANALYTICS_ID=your_analytics_id
```

### 3. Database Monitoring

Monitor your Supabase database:
1. Go to Supabase dashboard
2. Check Database → Logs
3. Monitor API usage

## 🛠️ Troubleshooting

### Common Issues

#### 1. Build Fails
- Check all environment variables are set
- Ensure DATABASE_URL is accessible
- Verify API keys are valid

#### 2. Database Connection Issues
- Check Supabase project is running
- Verify connection string format
- Ensure IP whitelist includes Vercel IPs

#### 3. Authentication Not Working
- Verify BETTER_AUTH_URL matches your domain
- Check BETTER_AUTH_SECRET is set
- Ensure GitHub OAuth is configured (if using)

#### 4. API Keys Not Working
- Double-check all API keys are correct
- Ensure they're set in Vercel environment variables
- Check API service status pages

### Getting Help

1. **Vercel Issues**: Check [Vercel documentation](https://vercel.com/docs)
2. **Supabase Issues**: Check [Supabase docs](https://supabase.com/docs)
3. **API Service Issues**: Check respective service documentation
4. **General Issues**: Open an issue in the GitHub repository

## 🎉 Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] User can sign in with GitHub
- [ ] API documentation scraping works
- [ ] Chat functionality is responsive
- [ ] Code generation produces valid code
- [ ] All sponsored tools are functioning
- [ ] Custom domain is working (if configured)
- [ ] SSL certificate is valid
- [ ] Performance is acceptable

## 📊 Performance Optimization

### 1. Vercel Configuration

Add to `vercel.json`:

```json
{
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/health",
      "destination": "/api/health"
    }
  ]
}
```

### 2. Database Optimization

- Use database connection pooling
- Add indexes for frequently queried fields
- Monitor query performance in Supabase

### 3. Caching Strategy

- Leverage Vercel's edge caching
- Cache API responses where appropriate
- Use SWR for client-side caching

## 🔐 Security Considerations

### 1. Environment Variables
- Never commit API keys to version control
- Use different keys for staging/production
- Rotate keys regularly

### 2. Database Security
- Use row-level security in Supabase
- Limit database access to necessary operations
- Monitor for suspicious activity

### 3. API Rate Limiting
- Implement rate limiting for API endpoints
- Monitor usage patterns
- Set up alerts for unusual activity

---

**🎯 Ready to launch your API Whisperer?**

Deploy now and start transforming how developers interact with APIs!

[🚀 Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/api-whisperer) | [📧 Get Support](mailto:support@yourproject.com)