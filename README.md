# internship-tracker-frontend
The frontend for the COMP208 internship tracker group project

Responsible for:

Rendering UI
Form handling
Client-side routing
Sending authenticated API requests
Managing server state (React Query)
Listening to WebSocket events
Displaying analytics charts

Not responsible for:

Business rules
Data validation enforcement
Database access
Security decisions



Core Stack

Frontend:

React (Vite)
TypeScript
React Query
Axios

Backend:

NestJS
Prisma ORM
PostgreSQL (Supabase)
JWT (simple access token)
bcrypt

Infrastructure:

Docker (development only)
Vercel (frontend)
Render (backend)
Supabase (database)

Deeper look at frontend technologies:

React (Vite)

UI rendering engine and SPA framework

Builds the single-page application
Handles routing
Renders components
Executes in the browser
Fast dev server
Optimised production build output



TypeScript

Static type safety layer

Prevents runtime bugs
Ensures consistent API contracts
Improves maintainability



React Query

Server state management + caching layer

Handles API request lifecycle
Caches backend responses
Manages loading / error states
Refetches intelligently



Axios

HTTP client abstraction

Sends REST requests to backend
Attaches JWT to headers
Centralises API configuration



Vercel (Frontend Hosting)
Builds React app
Serves static assets via CDN
Automatically provides HTTPS
Injects environment variables
No server-side logic


Architechture Flow:

User (Browser)
    ↓
React (Vercel-hosted static app)
    ↓  HTTPS (REST)
NestJS API (Render)
    ↓  Prisma
PostgreSQL (Supabase)