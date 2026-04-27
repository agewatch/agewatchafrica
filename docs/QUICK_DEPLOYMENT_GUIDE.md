# Quick Visual Guide: Image Upload & Deployment

## 📸 How Images Work

```
┌─────────────────────────────────────────────────────────────┐
│                    IMAGE FLOW DIAGRAM                        │
└─────────────────────────────────────────────────────────────┘

LOCAL DEVELOPMENT:
┌──────────────┐    Upload     ┌───────────────────────┐
│   Images     │──────────────>│  Backend Storage      │
│  (JPG/PNG)   │               │  storage/app/public/  │
└──────────────┘               │  community-photos/    │
                               └───────────────────────┘
                                          │
                                          │ Symlink
                                          ▼
                               ┌───────────────────────┐
                               │  public/storage/      │
                               │  (symlinked)          │
                               └───────────────────────┘
                                          │
                                          │ HTTP Request
                                          ▼
                               ┌───────────────────────┐
                               │  URL:                 │
                               │  /storage/image.jpg   │
                               └───────────────────────┘
                                          │
                                          │ API Response
                                          ▼
┌──────────────────────────────────────────────────────────┐
│  Frontend fetches: /api/public/photos                    │
│  Gets JSON: { "image_url": "/storage/image.jpg" }        │
│  Displays in gallery                                     │
└──────────────────────────────────────────────────────────┘
```

## 🚀 Deployment Steps

### Step 1: Prepare Files
```
Run: scripts\prepare-deployment.bat

Creates:
  deployment\
  ├── backend.zip              (Laravel + Images)
  ├── frontend.zip             (Built React app)
  ├── community_photos_export.sql  (Database)
  └── DEPLOY_INSTRUCTIONS.txt  (Step-by-step guide)
```

### Step 2: Upload Backend
```
DirectAdmin File Manager:
  domains/yourdomain.com/
  ├── backend/                  ← Upload & extract backend.zip
  │   ├── storage/
  │   │   └── app/
  │   │       └── public/
  │   │           └── community-photos/  ← Images are here!
  │   └── vendor/
  └── public_html/
      └── api/                  ← Copy from backend/public/
```

### Step 3: Create Storage Symlink
```
Option A: Symlink (if supported)
  public_html/api/storage → ../../backend/storage/app/public

Option B: .htaccess (if symlinks don't work)
  File: public_html/api/.htaccess
  Add: RewriteRule ^storage/(.*)$ ../../backend/storage/app/public/$1 [L]
```

### Step 4: Upload Frontend
```
DirectAdmin File Manager:
  public_html/
  ├── api/              ← DON'T DELETE (backend)
  ├── assets/           ← From frontend.zip
  ├── index.html        ← From frontend.zip
  └── ...other files    ← From frontend.zip
```

### Step 5: Import Database
```
DirectAdmin → MySQL → phpMyAdmin
  1. Select database
  2. Import → community_photos_export.sql
  3. Run SQL:
     UPDATE community_photos
     SET image_url = REPLACE(image_url, 'http://localhost', 'https://api.yourdomain.com');
```

## ✅ Testing Checklist

```
Test 1: Backend API
  URL: https://api.yourdomain.com/api/public/photos
  Expected: JSON with 7 photos

Test 2: Image Direct Access
  URL: https://api.yourdomain.com/storage/community-photos/jim-alvey-1.jpg
  Expected: Image displays

Test 3: Frontend Gallery
  URL: https://yourdomain.com
  Navigate to: Gallery section
  Expected: 7 photos visible

Test 4: Testimonial
  URL: https://yourdomain.com
  Navigate to: "Traveler Stories"
  Expected: Jim Alvey's testimonial shows
```

## 📁 File Structure on Production

```
yourdomain.com (DirectAdmin)
├── domains/
│   └── yourdomain.com/
│       └── backend/                    ← Laravel Backend
│           ├── app/
│           ├── storage/
│           │   └── app/
│           │       └── public/
│           │           └── community-photos/
│           │               ├── jim-alvey-1.jpg  ← Images!
│           │               ├── jim-alvey-2.jpg
│           │               └── ... (7 total)
│           ├── vendor/
│           └── .env                    ← Configure this!
│
└── public_html/                        ← Web Root
    ├── api/                            ← API Subdomain
    │   ├── index.php                   ← Laravel entry (fix paths!)
    │   ├── storage/                    ← Symlink to backend/storage/app/public
    │   └── .htaccess
    ├── assets/                         ← React Frontend
    ├── index.html                      ← React Entry
    └── ... (other frontend files)
```

## 🔧 Common Issues & Solutions

### Issue 1: Images return 404
```
Solution:
  1. Check symlink: public_html/api/storage exists
  2. Check permissions: storage/ folders are 755
  3. Check .htaccess has rewrite rules
  4. Test: https://api.yourdomain.com/storage/community-photos/jim-alvey-1.jpg
```

### Issue 2: Frontend shows placeholder images
```
Solution:
  1. Check API: https://api.yourdomain.com/api/public/photos
  2. Should return JSON with 7 photos
  3. Check browser console for errors
  4. Verify CORS headers in .htaccess
```

### Issue 3: Database shows localhost URLs
```
Solution:
  Run in phpMyAdmin:
  UPDATE community_photos
  SET image_url = REPLACE(image_url, 'http://localhost', 'https://api.yourdomain.com');
```

## 📤 How to Upload NEW Images After Deployment

### Method 1: Admin Panel (Easiest)
```
1. Login as admin: https://yourdomain.com/#/login
2. Go to: Admin → Photos
3. Click: Upload Photo
4. Select image → Add caption → Submit
5. Approve for public display
```

### Method 2: DirectAdmin File Manager
```
1. Upload image to:
   backend/storage/app/public/community-photos/new-photo.jpg

2. Add database record via phpMyAdmin:
   INSERT INTO community_photos
   (user_id, image_url, caption, status, moderated_by, moderated_at, created_at, updated_at)
   VALUES
   (1, 'https://api.yourdomain.com/storage/community-photos/new-photo.jpg',
    'New photo caption', 'approved', 1, NOW(), NOW(), NOW());
```

### Method 3: FTP/SFTP
```
1. Connect via FTP client (FileZilla)
2. Navigate to: backend/storage/app/public/community-photos/
3. Upload images
4. Add database records (Method 2, step 2)
```

## 🎯 Summary

**What You Have:**
- ✅ 7 Jim Alvey safari photos
- ✅ Testimonial on homepage
- ✅ Gallery section working
- ✅ API serving images
- ✅ Database with image records

**What You Need to Do:**
1. Run `scripts\prepare-deployment.bat`
2. Upload files to DirectAdmin
3. Setup symlink and permissions
4. Import database and update URLs
5. Test everything works

**Key URLs to Remember:**
- Frontend: `https://yourdomain.com`
- API: `https://api.yourdomain.com/api`
- Images: `https://api.yourdomain.com/storage/community-photos/`

**Full Guide:** See `docs/IMAGE_HANDLING_DEPLOYMENT.md`
