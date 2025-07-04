#!/bin/bash

# 🎯 API Whisperer Setup Script
# This script helps you get up and running quickly for the hackathon demo

set -e

echo "🎯 Setting up The API Whisperer..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✅ Installing dependencies..."
pnpm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your API keys before continuing."
    echo "   See README.md for details on getting API keys."
fi

# Check if database is configured
if [ -f .env ]; then
    if grep -q "your_supabase_url" .env; then
        echo "⚠️  Database not configured yet. Please update DATABASE_URL in .env"
    else
        echo "🗄️  Setting up database..."
        pnpm prisma generate
        pnpm prisma migrate dev --name init
    fi
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 Quick Start Commands:"
echo "  pnpm dev          # Start development server"
echo "  pnpm build        # Build for production"
echo "  pnpm start        # Start production server"
echo ""
echo "📚 Next Steps:"
echo "  1. Edit .env with your API keys"
echo "  2. Run 'pnpm dev' to start developing"
echo "  3. Visit http://localhost:3000"
echo ""
echo "🔑 Required API Keys:"
echo "  • Supabase (Database): https://supabase.com"
echo "  • Firecrawl (Web Scraping): https://firecrawl.dev"
echo "  • Tambo (AI Chat): https://tambo.co"
echo "  • Better Auth Secret: Generate with 'openssl rand -base64 32'"
echo ""
echo "✨ Optional but Recommended:"
echo "  • Resend (Email): https://resend.com"
echo "  • Autumn (Billing): https://useautumn.com"
echo "  • Lingo.dev (Translation): https://lingo.dev"
echo ""
echo "Happy hacking! 🚀"