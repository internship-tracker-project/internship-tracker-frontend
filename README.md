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


Architechture Flow:

User (Browser)
    ↓
React (Vercel-hosted static app)
    ↓  HTTPS (REST)
NestJS API (Render)
    ↓  Prisma
PostgreSQL (Supabase)