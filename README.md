# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# internship-tracker-frontend

The frontend for the COMP208 internship tracker group project

Responsible for:

| Responsible for | |
|---|---|
| 1 | Rendering UI |
| 2 | Form handling |
| 3 | Client-side routing |
| 4 | Sending authenticated API requests |
| 5 | Managing server state (React Query) |
| 6 | Listening to WebSocket events |
| 7 | Displaying analytics charts |

Not responsible for:

| Not responsible for | |
|---|---|
| 1 | Business rules |
| 2 | Data validation enforcement |
| 3 | Database access |
| 4 | Security decisions |



Core Stack

Frontend:

| Frontend | |
|---|---|
| 1 | React (Vite) |
| 2 | TypeScript |
| 3 | React Query |
| 4 | Axios |

Backend:

| Backend | |
|---|---|
| 1 | NestJS |
| 2 | Prisma ORM |
| 3 | PostgreSQL (Supabase) |
| 4 | JWT (simple access token) |
| 5 | bcrypt |

Infrastructure:

| Infrastructure | |
|---|---|
| 1 | Docker (development only) |
| 2 | Vercel (frontend) |
| 3 | Render (backend) |
| 4 | Supabase (database) |

Deeper look at frontend technologies:

React (Vite)

UI rendering engine and SPA framework

| React (Vite) | |
|---|---|
| Role | UI rendering engine and SPA framework |
| 1 | Builds the single-page application |
| 2 | Handles routing |
| 3 | Renders components |
| 4 | Executes in the browser |
| 5 | Fast dev server |
| 6 | Optimised production build output |



TypeScript

Static type safety layer

| TypeScript | |
|---|---|
| Role | Static type safety layer |
| 1 | Prevents runtime bugs |
| 2 | Ensures consistent API contracts |
| 3 | Improves maintainability |



React Query

Server state management + caching layer

| React Query | |
|---|---|
| Role | Server state management + caching layer |
| 1 | Handles API request lifecycle |
| 2 | Caches backend responses |
| 3 | Manages loading / error states |
| 4 | Refetches intelligently |



Axios

HTTP client abstraction

| Axios | |
|---|---|
| Role | HTTP client abstraction |
| 1 | Sends REST requests to backend |
| 2 | Attaches JWT to headers |
| 3 | Centralises API configuration |



Vercel (Frontend Hosting)

| Vercel (Frontend Hosting) | |
|---|---|
| 1 | Builds React app |
| 2 | Serves static assets via CDN |
| 3 | Automatically provides HTTPS |
| 4 | Injects environment variables |
| 5 | No server-side logic |


Architecture Flow:

User (Browser)
    ↓
React (Vercel-hosted static app)
    ↓  HTTPS (REST)
NestJS API (Render)
    ↓  Prisma
PostgreSQL (Supabase)

## Deployment

Hosted on Vercel; production deploys auto-trigger on every push to `main`.

| Setting | Value |
|---|---|
| Framework preset | Vite (auto-detected) |
| Build command | `npm run build` (auto-detected) |
| Output directory | `dist` (auto-detected) |
| Production branch | `main` |

**Required environment variable** (set in Vercel project settings, all environments):

| Variable | Value |
|---|---|
| `VITE_API_URL` | URL of the deployed Render backend, e.g. `https://internship-tracker-backend-5zmv.onrender.com` |

`vercel.json` rewrites all paths to `/index.html` so that client-side routes (`/applications`, `/analytics`, `/jobs`) survive direct navigation and hard refresh.

> **Note:** the Render free tier sleeps after ~15 minutes of inactivity. The first request after a long idle period (e.g. login) may take 20–30 seconds while the backend wakes up.
