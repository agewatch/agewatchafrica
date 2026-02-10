# DirectAdmin Deployment Notes

This project is deployed as:
- Main domain: React/Vite frontend (static files).
- Subdomain: Laravel API.

## Assumptions
- DirectAdmin account has File Manager and MySQL access.
- SSH may be unavailable; steps below avoid SSH.

## Backend (Laravel API) on subdomain
1. Upload and extract the `backend` folder at:
   - `domains/yourdomain.com/backend`
2. API subdomain document root:
   - Create subdomain `api`
   - Use `domains/yourdomain.com/public_html/api` as its root
3. Copy Laravel public files:
   - Copy contents of `backend/public` into `public_html/api`
4. Fix `public_html/api/index.php` paths:
   - `require __DIR__.'/../../backend/vendor/autoload.php';`
   - `$app = require_once __DIR__.'/../../backend/bootstrap/app.php';`
5. Set `backend/.env`:
   - `APP_URL=https://api.yourdomain.com`
   - DB credentials from DirectAdmin MySQL Management
6. Permissions:
   - `backend/storage` and `backend/bootstrap/cache` to `775`
   - If write errors persist, use `777`
7. If no SSH, clear caches by deleting:
   - `backend/bootstrap/cache/config.php`
   - `backend/bootstrap/cache/routes-*.php`
   - `backend/bootstrap/cache/services.php`
   - `backend/bootstrap/cache/packages.php`
   - Contents of `backend/storage/framework/cache`, `sessions`, `views`

## Frontend (React/Vite) on main domain
1. Set API URL in `frontend/.env`:
   - `VITE_API_BASE_URL=https://api.yourdomain.com/api`
2. Build:
   - `npm run build`
3. Upload contents of `frontend/dist` into:
   - `domains/yourdomain.com/public_html`
   - Keep `api/` and `cgi-bin` folders

## SPA routing
If server rewrites are unavailable, use hash routing:
- `/#/login` instead of `/login`
- The project is configured to use hash routes in production.
