# Property Flow Pioneers — AI-Powered Property Management Platform

A comprehensive property management automation platform for vacation rentals. This full-stack application combines a modern React dashboard with a FastAPI backend featuring autonomous AI agents to streamline listing management, pricing optimization, guest communication, and operational workflows.

## Overview

Property Flow Pioneers automates the end-to-end management of vacation rental properties across multiple platforms (Airbnb, Booking.com, Vrbo). The platform provides:

- **Centralized Listings Management** — Manage all your properties from a single dashboard
- **AI-Powered Pricing Intelligence** — Automated competitor analysis and dynamic pricing suggestions
- **Guest Communication Hub** — AI-assisted messaging and automated guest interactions
- **Operations Automation** — Streamlined cleaning schedules and maintenance workflows
- **Multi-Platform Integration** — Sync listings and availability across Airbnb, Booking.com, and Vrbo
- **Autonomous Agents** — Intelligent agents that handle pricing, calendar sync, guest communication, operations, and review management

## Architecture

The project consists of three main components:

### Frontend (`/src`)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn-ui components with Tailwind CSS
- **State Management**: Zustand + React Query
- **Routing**: React Router
- **Authentication**: Supabase Auth

### Backend (`/backend`)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (via SQLAlchemy)
- **Queue System**: Redis + Celery (for async tasks)
- **Integration**: n8n webhooks for workflow automation
- **Storage**: File-backed listings (JSON) with database persistence

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Workflow Automation**: n8n
- **Database**: PostgreSQL 15
- **Cache/Queue**: Redis 7

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm))
- **Python** 3.10+
- **Docker** and Docker Compose (for full stack)
- **PostgreSQL** (if running backend standalone)

### Option 1: Full Stack with Docker Compose (Recommended)

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GIT_URL>
   cd Property-Flow-Pioneers-AI-Hackathon-StationF-Project
   ```

2. **Set up backend environment**:
   ```bash
   cd backend
   cp .env.example .env  # Create .env file (see Environment Variables below)
   ```

3. **Start all services**:
   ```bash
   docker-compose up -d
   ```

   This starts:
   - PostgreSQL on port `5432`
   - Redis on port `6379`
   - n8n on port `5678`
   - Backend API on port `8000`

4. **Set up frontend**:
   ```bash
   # From project root
   npm install
   npm run dev
   ```

   Frontend runs on `http://localhost:8080` (or the port specified in `vite.config.ts`)

5. **Verify setup**:
   - Backend health: `curl http://localhost:8000/health`
   - Frontend: Open `http://localhost:8080` in your browser
   - n8n: Access `http://localhost:5678`

### Option 2: Local Development (Without Docker)

#### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended):
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration (see Environment Variables)
   ```

5. **Start backend server**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   API available at `http://127.0.0.1:8000`

#### Frontend Setup

1. **From project root, install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
npm run dev
```

   Frontend available at `http://localhost:8080`

## Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory with the following variables:

```env
# LLM Provider Configuration
LLM_PROVIDER=openai  # or anthropic, huggingface
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
HUGGINGFACE_API_KEY=your_key_here

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/unicorn

# Redis
REDIS_URL=redis://localhost:6379/0

# n8n Integration
N8N_WEBHOOK_URL=http://localhost:5678/webhook
N8N_API_URL=http://localhost:5678/api/v1
N8N_API_KEY=your_n8n_api_key

# Server
PORT=8000
```

### Frontend

The frontend uses Supabase for authentication. Configure Supabase credentials in your environment or through the Supabase client configuration.

## Project Structure

```
Property-Flow-Pioneers-AI-Hackathon-StationF-Project/
├── backend/                    # FastAPI backend service
│   ├── app/
│   │   ├── api/v1/            # API endpoints
│   │   │   ├── listing.py     # Listing CRUD endpoints
│   │   │   ├── webhook.py     # Webhook handlers
│   │   │   └── ai_proxy.py    # AI proxy endpoints
│   │   ├── services/
│   │   │   ├── agents/        # Autonomous AI agents
│   │   │   │   ├── pricing_agent.py
│   │   │   │   ├── calendar_agent.py
│   │   │   │   ├── guest_comm_agent.py
│   │   │   │   ├── ops_agent.py
│   │   │   │   └── review_agent.py
│   │   │   ├── listing_service.py    # Listing CRUD logic
│   │   │   ├── integrations_service.py  # Platform adapters
│   │   │   ├── n8n_service.py        # n8n integration
│   │   │   └── llm_service.py        # LLM abstraction
│   │   ├── models/            # Database models & schemas
│   │   ├── routes/            # Additional routes
│   │   └── main.py           # FastAPI app entry point
│   ├── data/
│   │   └── listings.json      # File-backed storage
│   ├── Dockerfile
│   ├── docker_compose.yaml
│   ├── requirements.txt
│   └── start.sh
│
├── frontend/                   # Simple HTML demo (legacy)
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── src/                        # React frontend application
│   ├── components/            # React components
│   │   ├── ui/               # shadcn-ui components
│   │   └── layout/           # Layout components
│   ├── pages/                # Page components
│   │   ├── Dashboard.tsx
│   │   ├── ListingsManager.tsx
│   │   ├── PricingIntelligence.tsx
│   │   ├── GuestHub.tsx
│   │   ├── OperationsCleaning.tsx
│   │   └── Integrations.tsx
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand state management
│   ├── integrations/         # Supabase client
│   └── lib/                  # Utilities
│
├── supabase/                  # Supabase migrations
│   └── migrations/
│
├── public/                    # Static assets
├── package.json
├── vite.config.ts
└── README.md
```

## Autonomous Agents

The backend includes five autonomous agents that automate various property management tasks:

### 1. **Pricing Agent** (`pricing_agent.py`)
- Analyzes competitor prices for similar properties
- Suggests optimal pricing based on market data
- Persists pricing recommendations to listings

### 2. **Calendar Agent** (`calendar_agent.py`)
- Syncs availability across platforms
- Updates listing calendars from remote sources
- Manages booking conflicts

### 3. **Guest Communication Agent** (`guest_comm_agent.py`)
- Generates AI-powered guest message replies
- Escalates complex issues via n8n webhooks
- Handles common guest inquiries automatically

### 4. **Operations Agent** (`ops_agent.py`)
- Schedules cleaning tasks based on bookings
- Triggers maintenance workflows via n8n
- Manages operational checklists

### 5. **Review Agent** (`review_agent.py`)
- Crafts personalized review requests using LLM
- Sends review prompts via n8n
- Tracks review status

## API Endpoints

### Health Check
- `GET /health` — Service health status

### Listings
- `GET /api/v1/listings` — List all listings
- `GET /api/v1/listings/{id}` — Get listing by ID
- `POST /api/v1/listings` — Create new listing
- `PUT /api/v1/listings/{id}` — Update listing
- `DELETE /api/v1/listings/{id}` — Delete listing

### Pricing
- `POST /api/v1/listings/{id}/pricing/suggest` — Get pricing suggestion
- `POST /api/v1/listings/{id}/pricing/apply` — Apply suggested price

### Webhooks
- `POST /api/v1/webhooks/n8n` — n8n webhook receiver

### AI Proxy
- `POST /api/v1/ai/proxy` — Proxy requests to LLM providers

## Docker Deployment

### Build Backend Image

```bash
cd backend
docker build -t property-flow-backend:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

### Run Backend Container Standalone

```bash
docker run --rm \
  -e PORT=8080 \
  -e DATABASE_URL=postgresql://... \
  -p 8080:8080 \
  property-flow-backend:latest
```

## Cloud Deployment

### Backend (Google Cloud Run)

1. **Build and push image**:
   ```bash
   cd backend
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/property-flow-backend:latest
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy property-flow-backend \
     --image gcr.io/YOUR_PROJECT_ID/property-flow-backend:latest \
     --region YOUR_REGION \
     --platform managed \
     --allow-unauthenticated \
     --set-env-vars "DATABASE_URL=...,REDIS_URL=..."
   ```

   Note: Cloud Run sets a `PORT` env var automatically; the container honors `${PORT:-8080}`.

### Frontend

The frontend can be deployed to:
- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Use the build command `npm run build`
- **Lovable**: Use the built-in publish feature (Share → Publish)

For Lovable deployment:
1. Open [Lovable Project](https://lovable.dev/projects/e5dafb19-5c17-4bd5-8044-57ef2bec245e)
2. Click **Share → Publish**

## Development

### Running Tests

```bash
# Backend tests (when available)
cd backend
pytest

# Frontend linting
npm run lint
```

### Code Structure

- **Backend**: Follows FastAPI best practices with service layer separation
- **Frontend**: Component-based architecture with custom hooks and Zustand state management
- **Agents**: Async functions that can be triggered via API or scheduled tasks

### Adding New Features

1. **New Agent**: Add to `backend/app/services/agents/` and expose via API endpoint
2. **New Page**: Add component to `src/pages/` and route in `src/App.tsx`
3. **New API Endpoint**: Add to `backend/app/api/v1/` and register in `backend/app/main.py`

## Technologies

### Frontend
- **React** 18.3
- **TypeScript** 5.8
- **Vite** 5.4
- **shadcn-ui** — Component library
- **Tailwind CSS** 3.4
- **React Router** 6.30
- **Zustand** 5.0 — State management
- **React Query** 5.83 — Data fetching
- **Supabase** — Authentication & database

### Backend
- **FastAPI** — Web framework
- **SQLAlchemy** — ORM
- **Alembic** — Database migrations
- **Celery** — Task queue
- **Redis** — Cache & message broker
- **Pydantic** — Data validation
- **Uvicorn** — ASGI server

### Infrastructure
- **PostgreSQL** 15 — Primary database
- **Redis** 7 — Cache & queue
- **n8n** — Workflow automation
- **Docker** — Containerization

## Security Notes

- Keep all API keys and secrets in `.env` files (never commit them)
- Use environment variables in production deployments
- Ensure `.env` is in `.gitignore`
- Rotate API keys regularly
- Use HTTPS in production

## Next Steps

- [ ] Implement real OAuth flows for platform integrations (Airbnb, Booking.com, Vrbo)
- [ ] Add Celery workers and persistent queue for agent tasks
- [ ] Persist remote IDs and audit logs to database
- [ ] Add comprehensive test coverage
- [ ] Implement real-time updates via WebSockets
- [ ] Add agent trigger endpoints for manual execution
- [ ] Enhance error handling and logging

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

**Important**: Never commit secrets or API keys. Always use `.env` files and ensure they're in `.gitignore`.

## License

[Add your license here]

## Links

- **Lovable Project**: https://lovable.dev/projects/e5dafb19-5c17-4bd5-8044-57ef2bec245e
- **API Documentation**: `http://localhost:8000/docs` (Swagger UI when backend is running)
- **n8n Dashboard**: `http://localhost:5678` (when running via Docker Compose)

---

**Built for the AI Hackathon at Station F**

For questions or issues, please open an issue on GitHub.
