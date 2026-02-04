# Emily Photography AI Chatbot - Secure Setup

## ✅ What's Included

Your chatbot now uses a **secure serverless function** that keeps your API key private. The API key is never exposed in your website code.

## 🚀 Deployment Steps

### Step 1: Deploy to Vercel (Free)

1. **Install Vercel CLI** (if you haven't already):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your site**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose "Emily Photography" as the project name
   - Accept the default settings

### Step 2: Add Your API Key as Environment Variable

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your "Emily Photography" project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Environments**: Check all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy

After adding the environment variable:
```bash
vercel --prod
```

## 🎉 Done!

Your chatbot is now live and secure. The API key is stored safely in Vercel's environment variables and never exposed in your code.

## 📁 What Was Created

- `/api/chat.js` - Serverless function that securely calls OpenAI
- `vercel.json` - Configuration for Vercel
- `.env.example` - Template for local development
- Updated `chatbot.js` - Now calls your secure API endpoint

## 💰 Cost

- Vercel hosting: **Free** for personal projects
- OpenAI API: Pay-per-use (~$0.0015 per conversation with GPT-3.5-turbo)

## 🔒 Security

✅ API key is never in your website code  
✅ API key is stored as an environment variable  
✅ Only your serverless function can access it  
✅ Safe to commit all code to GitHub  

## Alternative: GitHub Pages + Vercel

If you want to keep GitHub Pages for hosting but use Vercel just for the API:

1. Deploy to Vercel as above
2. Update the fetch URL in `chatbot.js` from `/api/chat` to:
   ```javascript
   fetch('https://your-vercel-url.vercel.app/api/chat', { ... })
   ```

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- OpenAI API Docs: https://platform.openai.com/docs
