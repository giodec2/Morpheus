# Morpheus

> **A local-first AI co-writer for novelists and storytellers.**
>
> Plan worlds, develop characters, and write with AI that learns your voice.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## 🌟 What is Morpheus?

Morpheus is a **local-first, browser-based AI co-writer** designed for fiction authors, novelists, and storytellers. Your work lives on your device first — write offline, sync when you're ready. The AI reads your characters, lore, and world-building notes to give you contextual, consistent help that never feels generic.

Whether you're drafting a fantasy epic, a horror short, or a sci-fi saga, Morpheus stays out of your way until you need it.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Co-Writer** | Chat with AI about your story. Brainstorm ideas, expand scenes, beat writer's block. The AI knows your world. |
| 📖 **Character & Lore Bible** | Build deep, consistent worlds. The AI remembers every trait, every rule, every secret you create. |
| 💾 **Local-First** | Your work lives on your device. Write offline anywhere. Sync to the cloud when you're ready. |
| 🔌 **Your Models, Your Choice** | Bring your own OpenRouter key, or use our hosted AI. From fast & cheap to creative powerhouses. |
| ☁️ **Cloud Sync** | Log in to sync your books, chapters, characters, and lore across all your devices. |
| 🌙 **Dark Mode** | Write comfortably day or night with a beautiful dark theme. |
| 📤 **Export** | Export your work to DOCX, PDF, Markdown, and more. |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+ and npm
- An [OpenRouter](https://openrouter.ai) API key (for BYOK mode)

### Installation

```bash
# Clone the repository
git clone https://github.com/giodec2/Morpheus.git
cd Morpheus

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

The production build will be output to the `dist/` directory.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **State** | Zustand |
| **Local DB** | Dexie.js (IndexedDB) |
| **Backend** | Appwrite Cloud |
| **AI** | OpenRouter API |
| **Editor** | TipTap / ProseMirror |

---

## 💎 Pricing

Morpheus is free to start. Upgrade when you need more.

| Plan | Price | Books | Standard Tokens | Premium Tokens |
|------|-------|-------|-----------------|----------------|
| **Free** | $0 | 1 | 100k/week | — |
| **Scribe** | $9/mo | 3 | 1M/week | — |
| **Novelist** | $19/mo | 10 | 2M/week | 100k/week |
| **Architect** | $49/mo | 50 | 10M/week | 1M/week |

🎉 **50% off your first month** on any paid plan.

---

## 📸 Screenshots

*Coming soon — screenshots will be added once we hit public beta.*

---

## 🗺️ Roadmap

- [x] Local-first editor with TipTap
- [x] AI chat with OpenRouter integration
- [x] Character & lore bible
- [x] Cloud sync via Appwrite
- [x] Landing page with pricing
- [x] Book limit enforcement
- [ ] Stripe / payment integration
- [ ] Hosted AI via Appwrite Edge Functions
- [ ] Token tracking & weekly resets
- [ ] Signature finetunes (genre-specific prompts)
- [ ] Self-learning models (Architect tier)
- [ ] Collaboration & sharing
- [ ] Mobile-responsive editor

---

## 🤝 Contributing

Morpheus is currently in early development. Contributions, feedback, and bug reports are welcome! Please open an issue or reach out.

---

## 📄 License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE) (AGPL-3.0).

> **Note:** As an AGPL-licensed project, any network use of this software (including hosting it as a web service) requires that you make the complete source code available to users under the same license.

---

## 🙏 Acknowledgments

Built with love for storytellers everywhere.

*“The universe is made of stories, not of atoms.”* — Muriel Rukeyser
