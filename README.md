# Ravi Kshirsagar — AI Engineer Portfolio

A dark, high-contrast, editorial personal portfolio cloned and adapted from the modern reactive architecture of `touquirakhtar.com`.

---

## ⚡ Quick Start

You can run this portfolio locally with any local static server:

### Option 1: Using Node / npm
```bash
npx serve -l 3000
```
Then open [http://localhost:3000](http://localhost:3000).

### Option 2: Using Python
```bash
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```text
@2/
├── index.html               # Main entry HTML with SEO meta tags, Google Fonts & root div
├── package.json             # Lightweight scripts for local preview
├── README.md                # Documentation & configuration guide
└── Asset/
    ├── dist/
    │   ├── app.css          # Design system stylesheet, typography, layout & animations
    │   └── app.js           # React + Framer Motion interactive engine with all portfolio data
    ├── img/
    │   ├── favicon.svg      # Site favicon
    │   ├── og-image.jpg     # Social share preview card
    │   ├── touquir-portrait.webp  # Hero portrait (replace with your photo if desired)
    │   └── work/            # Project showcase graphics (Job Scout, RAG Pipeline, Sentiment Bot, etc.)
    ├── svg/                 # High-definition tech stack icons (Python, FastAPI, Docker, OpenAI, LangChain, etc.)
    └── video/
        ├── cenova-reel.mp4  # System architecture video reel
        └── cenova-reel-poster.webp
```

---

## 🛠 Features Included

- **Motion Toggle & Accessibility**: Motion on/off toggle persisted across visits via `localStorage`.
- **Scroll Reading Progress**: Dynamic scroll progress bar tracking user position.
- **Interactive Project Showcase**: Filter by `AI Agents`, `Retrieval AI`, `NLP & LLMs`, `Backends`, or search by keyword.
- **Accessible Case Study Modals**: Click any project to open a focused modal dialog with keyboard ESC and Tab focus trapping.
- **Behind the Craft Architecture Slider**: Drag-to-reveal comparison stage illustrating system topology.
- **Interactive Brief & Contact Generator**: Contact form dynamically formatting inquiries for immediate outreach.
