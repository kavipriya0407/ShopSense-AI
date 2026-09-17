# ShopSense AI

A multi-role e-commerce platform combining a customer-facing storefront, a vendor management hub, and a super-admin console — wired to a retrieval-augmented (RAG) shopping assistant and data analyst.

![React](https://img.shields.io/badge/React-18-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pg-4169e1?logo=postgresql&logoColor=white)

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [User Flows](#user-flows)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Available Scripts](#available-scripts)

## Features

- **Customer Storefront** — browse products, view product details, manage a cart, place and track orders, and read company/product reviews.
- **AI Shopping Assistant** — a RAG assistant that answers product questions using an in-app product knowledge index.
- **AI Data Analyst** — a RAG-powered endpoint for querying analytics and reporting data in natural language.
- **Vendor Hub** — vendor dashboard, catalog management, product creation, sales insights, an AI assistant for vendors, and vendor profile management.
- **Super-Admin Console** — platform-wide dashboard, customer analytics, vendor management, product approvals, revenue tracking, analytics, and settings.
- **Analytics & Benchmarking** — dedicated analytics, benchmarking, and reports pages with chart visualizations (Recharts).

## Architecture

One React/Vite frontend serves all three roles behind client-side routing. A single Express API exposes health, database status, and the two RAG endpoints, backed by PostgreSQL with an in-memory dataset as a fallback when no database is reachable.

```mermaid
flowchart LR
    subgraph FE["Frontend — React + Vite"]
        A["Storefront & buyer pages"]
        B["Vendor hub"]
        C["Admin console"]
    end
    subgraph API["Backend — Express"]
        D["/api/health/"]
        E["/api/db/status/"]
        F["/api/rag/assistant/"]
        G["/api/rag/analyst/"]
    end
    subgraph RAG["RAG services"]
        H["Assistant service"]
        I["Analyst service"]
        J["Vector store"]
    end
    subgraph DB["Data layer"]
        K[("PostgreSQL: vendors, products, orders, order_items")]
        L[("In-memory fallback dataset")]
    end

    A -->|ask a question| F
    C -->|natural-language query| G
    A & B & C -->|status check| D
    A & B & C -->|status check| E
    F --> H --> J
    G --> I --> J
    E --> K
    K -. unavailable .-> L
```

## User Flows

<details open>
<summary><strong>Buyer</strong></summary>

```mermaid
flowchart TD
    A["Land on storefront"] --> B["Browse & search products"]
    B --> C["Open product details"]
    C --> D{"Need help deciding?"}
    D -- Yes --> E["Ask the RAG shopping assistant"]
    E --> C
    D -- No --> F["Add to cart"]
    F --> G["Check out"]
    G --> H["Track orders"]
    H --> I["Leave a product or company review"]
```
</details>

<details>
<summary><strong>Vendor</strong></summary>

```mermaid
flowchart TD
    A["Log in"] --> B["Vendor dashboard"]
    B --> C["Manage catalog"]
    C --> D["Add or edit a product"]
    B --> E["Review sales insights"]
    B --> F["Ask the vendor AI assistant"]
    B --> G["Update store profile"]
```
</details>

<details>
<summary><strong>Admin</strong></summary>

```mermaid
flowchart TD
    A["Log in"] --> B["Admin dashboard"]
    B --> C["Vendor management"]
    B --> D["Product approvals"]
    B --> E["Customer analytics"]
    B --> F["Revenue tracking"]
    B --> G["Platform analytics"]
    B --> H["Settings"]
```
</details>

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite (build tool)
- React Router DOM (routing)
- Tailwind CSS (styling)
- Recharts (data visualization)
- Lucide React (icons)

**Backend**
- Node.js + Express
- PostgreSQL (via `pg`), with an in-memory fallback dataset when no database is available
- Custom RAG services for the AI assistant and AI data analyst endpoints

## Project Structure

```
ShopSense-AI-main/
├── src/
│   ├── components/       # Shared UI and layout components
│   ├── context/           # React context providers (ShopSense, ShopZone)
│   ├── mock-data/         # Mock datasets used across the app
│   ├── pages/             # Route-level pages
│   │   ├── admin/          # Super-admin console pages
│   │   └── vendor/         # Vendor hub pages
│   ├── utils/             # Utility functions (e.g. CSV export)
│   ├── App.tsx            # Route definitions
│   └── main.tsx           # App entry point
├── server/
│   ├── db/                 # PostgreSQL connection + schema.sql
│   ├── services/           # RAG assistant/analyst services, vector store
│   └── index.js            # Express API server
├── scripts/                # Utility/dev scripts
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- PostgreSQL (optional — the backend falls back to an in-memory dataset if unavailable)

### Installation

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Environment Variables

Create a `.env` file in the project root (or `server/`) with:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/shopsense
PORT=5000
```

If `DATABASE_URL` is not set or the database is unreachable, the backend uses a built-in in-memory dataset instead.

### Database Setup (optional)

```bash
createdb shopsense
psql -d shopsense -f server/db/schema.sql
```

### Running the App

```bash
# Terminal 1 — backend API
npm run server

# Terminal 2 — frontend dev server
npm run dev
```

The frontend runs at `http://localhost:5173`, the API at `http://localhost:5000`.

### Build for Production

```bash
npm run build
npm run preview
```

## API Reference

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET`  | `/api/health` | Service health check |
| `GET`  | `/api/db/status` | Reports whether PostgreSQL or the in-memory fallback is active |
| `POST` | `/api/rag/assistant` | RAG shopping assistant — body: `{ query, filters }` |
| `POST` | `/api/rag/analyst` | RAG data analyst — body: `{ query, dateRange }` |

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite frontend dev server |
| `npm run server` | Start the Express backend server |
| `npm run build` | Type-check and build the frontend for production |
| `npm run preview` | Preview the production build locally |
