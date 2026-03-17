# FleetUI — Component Showcase

A modern, 21st.dev-inspired component showcase and admin UI platform built with React, TailwindCSS, and Radix UI.

## Live Demo

Deployed at: **https://sunilbittu913.github.io/riders-admin-ui/**

## Features

The showcase includes three main sections:

**Component Gallery** (`/showcase/components`) — Browse 15+ production-ready UI components with live previews, code snippets, and one-click copy. Components are organized by category: Layout, Forms & Inputs, Data Display, Feedback, Navigation, and Overlays.

**Projects Showcase** (`/showcase/projects`) — Explore 8 full-featured admin module templates including the Fleet Dashboard, Analytics, User Management, Dispute Resolution, Fare Engine, and Authentication System.

**Admin Panel** (`/admin/dashboard`) — The full-featured ride-sharing admin panel with drivers, passengers, fares, disputes, analytics, and reports.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Styling | TailwindCSS 3 |
| Components | Radix UI (shadcn/ui pattern) |
| Charts | Recharts |
| Routing | React Router v7 |
| Forms | react-hook-form + Zod |
| Build | Create React App + CRACO |
| Deployment | GitHub Pages (via GitHub Actions) |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sunilbittu913/riders-admin-ui.git
cd riders-admin-ui/frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Build for production
npm run build
```

## Deployment

The project deploys automatically to GitHub Pages when you push to the `main` branch via the included GitHub Actions workflow (`.github/workflows/deploy.yml`).

To enable GitHub Pages:
1. Go to **Settings > Pages** in your GitHub repository
2. Set **Source** to **GitHub Actions**
3. Push a commit to `main` to trigger the first deployment

## Project Structure

```
frontend/src/
├── components/
│   ├── layout/
│   │   ├── ShowcaseLayout.jsx    # 21st.dev-style sidebar layout
│   │   └── AdminLayout.jsx       # Admin panel layout
│   ├── theme/                    # Dark/light theme system
│   └── ui/                       # 40+ Radix UI components
├── pages/
│   ├── showcase/
│   │   ├── ShowcaseHomePage.jsx  # Home with component & project highlights
│   │   ├── ComponentsGalleryPage.jsx  # Full component gallery
│   │   └── ProjectsShowcasePage.jsx   # Project templates
│   └── ...                       # Admin panel pages
└── App.js                        # Routes configuration
```

## License

MIT — free to use, modify, and distribute.
