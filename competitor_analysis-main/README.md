# 📊 Vulse Analytix

Vulse Analytix is a client-facing analytics platform that provides:
- 🔎 Web search analysis
- 📱 Instagram profile/hashtag content analysis
- 💡 AI-generated marketing strategy recommendations using Azure OpenAI

This full-stack project combines a React (Next.js + TailwindCSS + ShadCN UI) frontend with a FastAPI backend.

---

## 🚀 Features

### 🌐 Web Search Module
- Input any keyword or query
- Fetch top relevant articles
- Generate actionable insights using LLM

### 📸 Social Media Module (Instagram)
- Analyze posts by **profile** or **hashtag**
- Display content previews
- Generate marketing suggestions based on post captions

### 🧠 Strategy Recommendations
- Uses Azure OpenAI GPT model to generate:
  - Direct insights from URLs
  - Content strategy based on Instagram posts
  - Personalized advice using stored client info

---

## 🔧 Environment Setup

Create a `.env` file in the `scrappers/` directory:
```env
ACCESS_TOKEN=your_instagram_token
IG_BUSINESS_ACCOUNT_ID=your_ig_id

# Set Azure OpenAI environment
AZURE_OPENAI_API_KEY=your_azure_api_key
AZURE_OPENAI_ENDPOINT=your_azure_endpoint
AZURE_OPENAI_API_VERSION=your_api_version
```

---

## 🗂️ Project Structure

```
.gitignore
README.md

app/
├── api/
│   ├── hashtag_top_posts.tsx
│   └── ig_account_api.tsx
├── components/
│   ├── RecommendationDialog.tsx
│   ├── navbar.tsx
│   ├── post.tsx
│   ├── search_results.tsx
├── socials/
│   ├── instagram/
│   │   ├── AccountView.tsx
│   │   └── HashtagView.tsx
│   ├── page.tsx
│   ├── searchType.tsx
│   ├── socialType.tsx
│   ├── types/index.ts
│   └── views.tsx
├── web-search/
│   ├── SearchResultsView.tsx
│   ├── UrlRecommendationView.tsx
│   ├── page.tsx
│   ├── types/index.ts
│   └── views.tsx
├── favicon.ico
├── globals.css
├── layout.tsx
├── page.tsx

components/
├── modetoggle.tsx
├── theme-provider.tsx
└── ui/
    ├── alert-dialog.tsx
    ├── alert.tsx
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── command.tsx
    ├── dialog.tsx
    ├── dropdown-menu.tsx
    ├── input.tsx
    ├── label.tsx
    ├── menubar.tsx
    ├── navigation-menu.tsx
    ├── popover.tsx
    ├── scroll-area.tsx
    ├── select.tsx
    ├── skeleton.tsx
    ├── textarea.tsx
    ├── toast.tsx
    ├── toaster.tsx
    ├── toggle-group.tsx
    └── toggle.tsx

scrappers/
├── client.py
├── create.py
├── instagram_hashtag_scrapper.py
├── instagram_scrapper.py
├── main.py
├── scrapper.py
├── test.sql
├── vulse.sql
├── web_search.py

hooks/
└── use-toast.ts

next.config.ts
tailwind.config.ts
tscconfig.json
package.json
package-lock.json
postcss.config.mjs
public/
├── file.svg
├── globe.svg
└── window.svg
```

---

## 📦 Installation & Run

### 📁 Backend (FastAPI)
```bash
cd scrappers
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 🌐 Frontend (Next.js)
```bash
npm install
npm run dev
```

---

## ⚙️ Tech Stack
- **Frontend**: Next.js, TypeScript, TailwindCSS, ShadCN UI, Lucide Icons
- **Backend**: FastAPI, LangChain, Python
- **AI/LLM**: Azure OpenAI GPT
- **Data**: Instagram Graph API, Web scraping (SerpAPI, Newspaper3k)

---

## 🥪 Local Testing
- Visit `http://localhost:3000` for the frontend
- Backend: `http://127.0.0.1:8000/docs` for FastAPI Swagger UI

---

## 📬 Feedback
If you find any bugs or have suggestions, feel free to open an issue or contribute via pull request.

