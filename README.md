# Bryan Jaimes | AI/ML Engineer Portfolio

A modern, glassmorphic personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, Three.js, and Framer Motion. Designed to showcase AI/ML engineering projects with a premium iOS 26-inspired glass UI aesthetic.

![Portfolio Preview](preview.png)

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router for SSR/SEO |
| **TypeScript** | Type-safe code for scalability |
| **Tailwind CSS** | Utility-first styling with custom glass effects |
| **Three.js + React Three Fiber** | 3D globe visualization in the hero |
| **Framer Motion** | Smooth, Apple-style animations |
| **Vercel** | Recommended hosting platform |

## ✨ Features

- **🌐 Interactive 3D Globe** - Neural network visualization with particles
- **🪟 Glassmorphic UI** - iOS 26-inspired glass card effects with blur
- **🎨 Smooth Animations** - Scroll-triggered reveals and micro-interactions
- **📱 Fully Responsive** - Mobile-first design that looks great everywhere
- **🔍 SEO Optimized** - Server-side rendering with meta tags
- **⚡ Performance** - Optimized bundle size and lazy-loaded 3D components

## 📁 Project Structure

```
bryanjaimes/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles + glass utilities
│   │   ├── layout.tsx       # Root layout with fonts
│   │   └── page.tsx         # Main page component
│   ├── components/
│   │   ├── Navigation.tsx   # Fixed nav with blur effect
│   │   ├── Hero.tsx         # Hero section with 3D globe
│   │   ├── GlobeScene.tsx   # Three.js globe component
│   │   ├── Projects.tsx     # Project cards grid
│   │   ├── Experience.tsx   # Timeline experience section
│   │   ├── Contact.tsx      # Contact cards section
│   │   ├── Footer.tsx       # Site footer
│   │   └── index.ts         # Component exports
│   └── fonts/
│       └── README.md        # Font installation guide
├── public/                  # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js 18.17+** - [Download here](https://nodejs.org/)
- **npm** or **yarn** or **pnpm**

### Step 1: Install Node.js

If you don't have Node.js installed:

**Windows:**
1. Download the LTS version from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Restart your terminal

**macOS (with Homebrew):**
```bash
brew install node
```

**Verify installation:**
```bash
node --version
npm --version
```

### Step 2: Install Dependencies

Navigate to the project directory and install packages:

```bash
cd bryanjaimes
npm install
```

This will install:
- Next.js 15 (React framework)
- React 19
- Three.js + React Three Fiber (3D graphics)
- Framer Motion (animations)
- Tailwind CSS (styling)
- TypeScript + type definitions

### Step 3: Add Fonts (Optional)

For the best typography, download Instrument Serif:

1. Go to [Google Fonts - Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)
2. Download the font files
3. Place `InstrumentSerif-Regular.ttf` and `InstrumentSerif-Italic.ttf` in `src/fonts/`

> **Note:** The site will fall back to Georgia/serif if fonts aren't available.

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment to Vercel

The recommended way to deploy this site:

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Next.js and deploys

## 🎨 Customization Guide

### Update Your Information

Edit these files to personalize:

1. **`src/app/layout.tsx`** - Update metadata (title, description, keywords)
2. **`src/components/Hero.tsx`** - Change name, description, stats
3. **`src/components/Projects.tsx`** - Add your projects
4. **`src/components/Experience.tsx`** - Update work history
5. **`src/components/Contact.tsx`** - Add your contact links

### Modify Color Theme

Edit `tailwind.config.ts` to change the color palette:

```typescript
colors: {
  accent: {
    blue: "#3b82f6",    // Primary accent
    cyan: "#06b6d4",    // Secondary accent
    green: "#10b981",   // Success/health accent
    purple: "#8b5cf6",  // Tertiary accent
  },
}
```

### Adjust Glass Effect

Modify the glass utilities in `src/app/globals.css`:

```css
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,  /* Adjust opacity */
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(40px);  /* Adjust blur amount */
  border: 1px solid rgba(255, 255, 255, 0.1);  /* Border opacity */
}
```

## 📝 Adding a New Project

Add a new project to the `projects` array in `src/components/Projects.tsx`:

```typescript
{
  id: "my-project",
  icon: "🎯",
  title: "My New Project",
  description: "A brief description of what this project does.",
  longDescription: "Extended description for detailed view.",
  tags: ["Python", "TensorFlow", "FastAPI"],
  highlight: {
    icon: "↑",
    text: "Key achievement or metric",
  },
  gradient: "from-blue-500 to-cyan-400",
  glowColor: "rgba(59, 130, 246, 0.2)",
  link: "https://github.com/username/project",
}
```

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 📄 License

MIT License - feel free to use this template for your own portfolio!

---

Built with ❤️ by Bryan Jaimes | [lebryanjaimes23@gmail.com](mailto:lebryanjaimes23@gmail.com)
