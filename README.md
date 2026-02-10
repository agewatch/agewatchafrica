# AgeWatchAfrica

Multi-page React static frontend + Laravel API + MySQL.

## Structure
- frontend: React app (static build)
- backend: Laravel API
- infra: hosting config notes for DirectAdmin
- scripts: helper scripts
- docs: project docs

## Local setup
### Backend (Laravel)
1. Install dependencies:
   - `cd backend`
   - `composer install`
2. Copy env and update values:
   - `copy .env.example .env` (Windows) or `cp .env.example .env`
3. Generate app key:
   - `php artisan key:generate`
4. Configure DB in `backend/.env`, then run:
   - `php artisan migrate`
5. Run API:
   - `php artisan serve`

### Frontend (React/Vite)
1. Install dependencies:
   - `cd frontend`
   - `npm install`
2. Configure API base URL:
   - `copy .env.example .env` (Windows) or `cp .env.example .env`
   - Update `VITE_API_BASE_URL` in `frontend/.env`
3. Run dev server:
   - `npm run dev`

### Production build (frontend)
1. Build:
   - `npm run build`
2. Deploy the contents of `frontend/dist` to your web root.
