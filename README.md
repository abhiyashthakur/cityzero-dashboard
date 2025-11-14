# CityZero — Zero-Waste Urban Management System

A municipal operations dashboard that compares recycling, composting, and landfill flows while rewarding neighborhoods and residents for zero-waste participation.

## Features
- **Live diversion snapshot** with progress toward zero-waste goals.
- **Waste stream scorecards** highlighting trend deltas and contamination rates.
- **Interactive diversion chart** powered by Recharts for multi-stream visibility.
- **District leaderboard** for healthy competition between neighborhoods.
- **Citizen participation view** mapping challenges and community champions.
- **Mobile-friendly layout** with responsive cards and stacked charts.

## Tech stack
- [Vite](https://vitejs.dev/) + React + TypeScript
- [Recharts](https://recharts.org/) for visualizations
- [Lucide](https://lucide.dev/) icons
- [Vitest](https://vitest.dev/) + Testing Library for unit testing

## Getting started
1. **Install prerequisites**
   - [Node.js](https://nodejs.org/) v18 or newer (includes `npm`)
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run locally**
   ```bash
   npm run dev
   ```
   Vite will print the local URL (default `http://localhost:5173`).
4. **Run the production build**
   ```bash
   npm run build
   npm run preview
   ```
5. **Execute unit tests**
   ```bash
   npm run test
   ```

## Project structure
```
├─ src
│  ├─ components     // Dashboard building blocks
│  ├─ data           // Mock municipal data feeds
│  ├─ utils          // Metric helpers + tests
│  ├─ App.tsx        // Page composition
│  └─ main.tsx       // React entrypoint
├─ public/index.html // Shell document served by Vite
├─ package.json
└─ vite.config.ts
```

## Deploying / publishing
1. Create a new GitHub repository (e.g., `cityzero-dashboard`).
2. Initialize git locally, commit, and push:
   ```bash
   git init
   git add .
   git commit -m "feat: bootstrap CityZero dashboard"
   git branch -M main
   git remote add origin git@github.com:<your-account>/cityzero-dashboard.git
   git push -u origin main
   ```
3. Deploy via Vercel/Netlify/GitHub Pages using `npm run build` artifacts (`dist/`).

## Next steps
- Swap mock data with live city data sources / APIs.
- Gate leaderboard or participation actions behind authentication (CIVIC single sign-on, etc.).
- Add alerting hooks to notify operations teams when contamination spikes.
