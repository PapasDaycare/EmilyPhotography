# Emily Photography AI Chatbot

## Setup Instructions

The AI chatbot has been added to your website. To make it functional, you need to add your OpenAI API key.

### Step 1: Get an OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key (it starts with `sk-`)

### Step 2: Add Your API Key

Open `chatbot.js` and find this line (around line 6):

```javascript
this.apiKey = 'YOUR_OPENAI_API_KEY_HERE';
```

Replace `'YOUR_OPENAI_API_KEY_HERE'` with your actual API key:

```javascript
this.apiKey = 'sk-your-actual-key-here';
```

### Step 3: Important Security Note ⚠️

**WARNING**: Putting your API key directly in the JavaScript file exposes it to anyone who visits your website. This means anyone could use your API key and you'll be charged for their usage.

### Better Alternative: Use a Backend Service

For production use, you should:

1. **Option A**: Use a serverless function (Vercel/Netlify Functions)
   - Create a backend endpoint that securely calls OpenAI
   - The chatbot calls YOUR endpoint instead of OpenAI directly
   - Your API key stays hidden on the server

2. **Option B**: Use a chatbot service like:
   - Tawk.to (free)
   - Tidio (has free tier)
   - Crisp (has free tier)

### For Testing Only

If you just want to test it locally:
1. Add your API key to `chatbot.js`
2. Test it on your local computer
3. **Remove the API key before pushing to GitHub**

### Customization

You can customize the chatbot's behavior by editing the `systemPrompt` in `chatbot.js` (around line 95). This controls:
- How the bot introduces itself
- What information it provides
- Its tone and personality

### Cost Estimate

- Using GPT-3.5-turbo: ~$0.0015 per conversation
- 1000 conversations ≈ $1.50
- Monitor usage at https://platform.openai.com/usage

## Features

- ✅ Branded design matching your website colors
- ✅ Mobile responsive
- ✅ Smooth animations
- ✅ Typing indicators
- ✅ Context-aware responses about Emily Photography
- ✅ Can answer questions about pricing, services, booking

## Need Help?

Let me know if you need help setting up a secure backend endpoint for the chatbot!
