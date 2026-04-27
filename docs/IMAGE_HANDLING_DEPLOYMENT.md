# Image Handling & Deployment Guide for DirectAdmin

## Overview
Images are stored in the Laravel backend and served through the storage symlink. The frontend fetches images via API calls.

---

## How Images Flow from Backend to Frontend

### 1. **Backend Storage Structure**
```
backend/
├── storage/
│   └── app/
│       └── public/
│           └── community-photos/    ← Images stored here
│               ├── jim-alvey-1.jpg
│               ├── jim-alvey-2.jpg
│               └── ...
└── public/
    └── storage/ → symlink to storage/app/public
```

### 2. **How It Works**
1. **Storage**: Images uploaded to `storage/app/public/community-photos/`
2. **Symlink**: `public/storage` symlinks to `storage/app/public`
3. **URL**: Images accessible at `http://yourdomain.com/storage/community-photos/image.jpg`
4. **Database**: Stores full URL: `http://yourdomain.com/storage/community-photos/image.jpg`
5. **API**: Frontend calls `/api/public/photos` which returns JSON with image URLs
6. **Frontend**: Displays images using URLs from API response

---

## Local Development Setup (Already Done)

✅ You've already set this up:
```bash
# Storage symlink created
php artisan storage:link

# Images uploaded to:
backend/storage/app/public/community-photos/

# Database records created with full URLs
```

---

## Production Deployment to DirectAdmin

### Part 1: Backend Deployment with Images

#### Step 1: Prepare Backend for Upload
```bash
# In your local machine
cd backend

# Create a zip of the entire backend folder (including storage with images)
# You can use WinRAR, 7-Zip, or Windows built-in zip
```

**Important files to include:**
- ✅ `storage/app/public/community-photos/` (with all 7 Jim Alvey images)
- ✅ `vendor/` directory (all Laravel dependencies)
- ✅ `.env.example` (you'll create .env on server)
- ✅ All Laravel files

#### Step 2: Upload to DirectAdmin
1. **Login to DirectAdmin** File Manager
2. **Navigate to**: `domains/yourdomain.com/`
3. **Upload** the backend.zip file
4. **Extract** the zip file
5. Your structure should be:
   ```
   domains/yourdomain.com/
   ├── backend/
   │   ├── storage/
   │   │   └── app/
   │   │       └── public/
   │   │           └── community-photos/  ← Images here
   │   ├── vendor/
   │   ├── public/
   │   └── ...
   └── public_html/
       └── api/
   ```

#### Step 3: Setup API Subdomain
1. **Create subdomain** `api.yourdomain.com` in DirectAdmin
2. **Set document root** to: `domains/yourdomain.com/public_html/api`
3. **Copy Laravel public files**:
   - Copy everything from `backend/public/*` to `public_html/api/`

#### Step 4: Fix index.php Paths
Edit `public_html/api/index.php`:
```php
// Change these two lines:
require __DIR__.'/../../backend/vendor/autoload.php';
$app = require_once __DIR__.'/../../backend/bootstrap/app.php';
```

#### Step 5: Create Storage Symlink on Production
Since you can't run `php artisan storage:link` without SSH, **manually create the symlink**:

**Option A: Using DirectAdmin File Manager**
1. Navigate to `public_html/api/`
2. Create a symbolic link named `storage` pointing to `../../backend/storage/app/public`

**Option B: Using .htaccess Redirect (if symlinks don't work)**
Create `public_html/api/.htaccess`:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Redirect storage requests to actual storage location
    RewriteRule ^storage/(.*)$ ../../../backend/storage/app/public/$1 [L]

    # Laravel routing
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

#### Step 6: Set Permissions
Using DirectAdmin File Manager, set permissions:
- `backend/storage/` → **775** (or 777 if 775 doesn't work)
- `backend/bootstrap/cache/` → **775** (or 777)
- `backend/storage/app/public/community-photos/` → **755**

#### Step 7: Configure Environment
Create `backend/.env` (copy from `.env.example`):
```env
APP_NAME="AgeWatchAfrica"
APP_ENV=production
APP_KEY=base64:your-app-key-here
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# Important for image URLs
APP_URL=https://api.yourdomain.com
```

#### Step 8: Test Image URLs
Test if images are accessible:
```
https://api.yourdomain.com/storage/community-photos/jim-alvey-1.jpg
https://api.yourdomain.com/storage/community-photos/jim-alvey-2.jpg
```

If images don't load, check:
1. ✅ Storage symlink exists in `public_html/api/storage`
2. ✅ Permissions are correct (755 or 775)
3. ✅ Images exist in `backend/storage/app/public/community-photos/`

---

### Part 2: Database Migration

#### Step 1: Export Local Database
```bash
# Export only community_photos table
docker exec backend-mysql-1 mysqldump -u root -proot agewatch community_photos > community_photos.sql
```

Or export from phpMyAdmin in your local setup.

#### Step 2: Import to Production
1. **Login to DirectAdmin** → MySQL Management
2. **Select your database**
3. **Go to phpMyAdmin**
4. **Import** the `community_photos.sql` file

#### Step 3: Update Image URLs in Production Database
After import, update URLs to use production domain:

**Option A: Using phpMyAdmin SQL tab**
```sql
UPDATE community_photos
SET image_url = REPLACE(image_url, 'http://localhost', 'https://api.yourdomain.com');
```

**Option B: Using DirectAdmin MySQL Query**
Run the same query in DirectAdmin's MySQL query interface.

---

### Part 3: Frontend Deployment

#### Step 1: Update Frontend Environment
Edit `frontend/.env`:
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

#### Step 2: Build Frontend
```bash
cd frontend
npm run build
```

This creates the `dist/` folder with optimized production files.

#### Step 3: Upload Frontend
1. **Navigate to DirectAdmin** File Manager
2. **Go to**: `domains/yourdomain.com/public_html/`
3. **Upload all files** from `frontend/dist/` to `public_html/`
   - ⚠️ **Don't delete** the `api/` folder
   - Keep `cgi-bin/` if it exists

Your structure should be:
```
public_html/
├── api/           ← Backend API
├── assets/        ← Frontend assets
├── index.html     ← Frontend entry
└── ...
```

---

## How to Upload NEW Images in Production

### Method 1: Through Admin Panel (Recommended)
1. Login to your application as admin
2. Navigate to Admin → Photos
3. Upload images through the web interface
4. Approve them for public display

### Method 2: Manual Upload via DirectAdmin
1. **Upload image** to `backend/storage/app/public/community-photos/`
2. **Add database record** in phpMyAdmin:
```sql
INSERT INTO community_photos (user_id, image_url, title, caption, status, moderated_by, moderated_at, created_at, updated_at)
VALUES (
    1,
    'https://api.yourdomain.com/storage/community-photos/new-image.jpg',
    NULL,
    'Caption for the new image',
    'approved',
    1,
    NOW(),
    NOW(),
    NOW()
);
```

### Method 3: Upload via FTP/SFTP
1. Connect to your server via FTP
2. Navigate to `backend/storage/app/public/community-photos/`
3. Upload images
4. Add database records (same as Method 2)

---

## Troubleshooting Image Issues

### Images Don't Load (404 Error)

**Check 1: Storage Symlink**
```
File: public_html/api/storage
Should link to: ../../backend/storage/app/public
```

**Check 2: File Permissions**
```
backend/storage/app/public/ → 755
community-photos/*.jpg → 644
```

**Check 3: .htaccess Rewrite Rules**
Ensure `public_html/api/.htaccess` has correct rewrite rules.

**Check 4: Image URLs in Database**
```sql
SELECT id, image_url FROM community_photos LIMIT 5;
```
URLs should start with `https://api.yourdomain.com/storage/`

### Images Load Slowly

**Solution 1: Enable Image Optimization**
- Use DirectAdmin's image optimization features
- Consider using a CDN

**Solution 2: Serve Images from Subdomain**
- Create `cdn.yourdomain.com`
- Point to storage directory
- Update URLs in database

### CORS Issues

If frontend can't load images, add to `public_html/api/.htaccess`:
```apache
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

---

## Summary Checklist

### Backend:
- [ ] Upload backend folder with images
- [ ] Setup API subdomain
- [ ] Copy public files to api/
- [ ] Fix index.php paths
- [ ] Create storage symlink or .htaccess redirect
- [ ] Set permissions (755/775)
- [ ] Configure .env with production URLs
- [ ] Test image accessibility

### Database:
- [ ] Export community_photos table
- [ ] Import to production database
- [ ] Update image URLs to production domain

### Frontend:
- [ ] Update VITE_API_BASE_URL
- [ ] Build frontend (npm run build)
- [ ] Upload dist/ contents to public_html/

### Verification:
- [ ] Test image URL: https://api.yourdomain.com/storage/community-photos/jim-alvey-1.jpg
- [ ] Test API: https://api.yourdomain.com/api/public/photos
- [ ] Test frontend gallery: https://yourdomain.com
- [ ] Check browser console for errors

---

## Quick Reference: Image URL Flow

```
Local Development:
http://localhost/storage/community-photos/image.jpg
    ↓ (Served by Laravel)
Frontend fetches from: http://localhost/api/public/photos
    ↓
Displays images in gallery

Production:
https://api.yourdomain.com/storage/community-photos/image.jpg
    ↓ (Served by Laravel)
Frontend fetches from: https://api.yourdomain.com/api/public/photos
    ↓
Displays images in gallery
```

---

## Need Help?
- Check Laravel logs: `backend/storage/logs/laravel.log`
- Check server error logs in DirectAdmin
- Test API directly: `https://api.yourdomain.com/api/public/photos`
