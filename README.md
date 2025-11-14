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
│  ├─ config         // Site metadata (domain, contact info)
│  ├─ utils          // Metric helpers + tests
│  ├─ App.tsx        // Page composition
│  └─ main.tsx       // React entrypoint
├─ public/index.html // Shell document served by Vite
├─ package.json
└─ vite.config.ts
```

## Deploying / publishing
### Netlify + Namecheap custom domain
1. **Connect the repo**: In Netlify, “Add new site → Import existing project”, pick GitHub `cityzero-dashboard`, and keep build command `npm run build`, publish directory `dist/`.
2. **Enable continuous deploys**: Netlify will build on every `main` push using `netlify.toml`.
3. **Add the custom domain**: In Netlify → Domain settings, add your Namecheap domain (e.g., `cityzero.city`). Netlify provides DNS records.
4. **Configure Namecheap DNS**: In Namecheap dashboard, edit Advanced DNS:
   - Set the root (`@`) and `www` records to Netlify’s IPv4/IPv6 values (or use a CNAME to `<yoursite>.netlify.app`).
   - Wait for propagation (<24h). Netlify auto-provisions HTTPS.

### GitHub push (if not done yet)
```bash
git init
git add .
git commit -m "feat: bootstrap CityZero dashboard"
git branch -M main
git remote add origin git@github.com:<your-account>/cityzero-dashboard.git
git push -u origin main
```

## Next steps
- Swap mock data with live city data sources / APIs.
- Gate leaderboard or participation actions behind authentication (CIVIC single sign-on, etc.).
- Add alerting hooks to notify operations teams when contamination spikes.
- Update `src/config/site.ts` with your final Namecheap domain + contact email before launch.
