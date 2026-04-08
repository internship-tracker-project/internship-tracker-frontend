# Internship Tracker Frontend - Project Context

## Project Overview
**Name**: internship-tracker-frontend  
**Type**: React + TypeScript Frontend Application  
**Purpose**: Track job applications through their lifecycle (applied → interview → offer/rejected)  
**Status**: Early development - scaffolding complete, core features not yet implemented

---

## Current Architecture

### Tech Stack
- **Framework**: React 19.2.4 with TypeScript 6
- **Build Tool**: Vite 8
- **Routing**: React Router v7
- **State Management**: TanStack React Query v5 (for server state)
- **HTTP Client**: Axios 1.14
- **Styling**: Tailwind CSS 3.4
- **Linting**: ESLint with TypeScript plugin
- **Backend Integration**: Supabase (via API layer)

### Project Structure
```
src/
├── api/                    # Backend API calls (currently empty)
│   ├── application.ts      # Application endpoints (placeholder)
│   ├── auth.ts            # Authentication endpoints (placeholder)
│   └── client.ts          # HTTP client setup
├── components/            # Reusable UI components (empty - to be created)
├── hooks/                 # Custom React hooks (empty - to be created)
├── lib/
│   └── axios.ts          # Axios configuration
├── pages/                 # Page components (empty - to be created)
├── types/
│   └── application.ts     # Type definitions for Application domain
├── routes/
│   └── AppRoutes.tsx      # Route definitions (NEEDS FIXING)
└── App.tsx                # Root component

```

---

## Current State of Implementation

### Completed
✅ **Project Scaffolding**
- Vite + React + TypeScript setup
- Tailwind CSS configured
- ESLint + TypeScript linting configured
- Package.json with core dependencies installed

✅ **Type Definitions**
- `Application` interface defined with fields: id, company, role, status, appliedAt
- `ApplicationStatus` enum with: APPLIED, INTERVIEW, OFFER, REJECTED

✅ **Basic Routing Structure** (needs fixes)
- Route definitions in AppRoutes.tsx defined but all routes point to "/" with placeholder divs

### Incomplete (Not Yet Started)
❌ **API Integrations**
- application.ts - No endpoints defined
- auth.ts - No authentication logic
- Axios client configuration exists but not fully utilized

❌ **UI Components**
- No reusable components created yet
- Pages folder is empty

❌ **Features**
- Dashboard page not implemented
- Authentication (Login/Register) not implemented
- Applications list/management not implemented
- Analytics/insights not implemented
- Error handling and loading states not implemented

---

## Known Issues to Address

1. **Route Definitions Bug** (AppRoutes.tsx):
   - All 6 routes have path="/" (duplicates)
   - Should have: /, /login, /register, /applications, /analytics, and 404 catch-all
   - All using placeholder `<div>` elements instead of actual page components

2. **API Clients**: Empty files need endpoint implementations connecting to Supabase backend

3. **Missing Pages**: Dashboard, Login, Register, Applications list, Analytics pages not created

4. **Missing Components**: No reusable UI components exist yet (buttons, forms, cards, tables, etc.)

---

## Feature Scope (Expected)

Based on structure and type definitions, the application should support:
- **Authentication**: User login/registration
- **Application Tracking**: 
  - View all job applications
  - Create new applications
  - Update application status
  - Filter/search applications
- **Analytics**: Summary stats about applications (by status, date ranges, etc.)
- **Dashboard**: Overview of application pipeline and key metrics

---

## Development Notes

- **Scripts Available**:
  - `npm run dev` - Start development server (Vite)
  - `npm run build` - Build for production
  - `npm run lint` - Run ESLint
  - `npm run preview` - Preview production build

- **No Backend URL Configured Yet**: API calls will need backend server setup (Supabase)

- **No Authentication Context**: Need to implement auth state management and protected routes

---

## Next Steps (Recommended Order)

1. Fix route definitions and create page component structure
2. Implement authentication flow (Login/Register pages + auth API)
3. Build reusable UI components (forms, tables, cards)
4. Implement application management features
5. Add analytics/dashboard view
6. Connect to Supabase backend 

---

**Last Updated**: April 8, 2026  
**Document Purpose**: Provide AI agent context for consistent project understanding across conversations
