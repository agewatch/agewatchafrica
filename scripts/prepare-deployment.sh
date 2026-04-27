#!/bin/bash
# Deployment preparation script for DirectAdmin

echo "================================================"
echo "AgeWatchAfrica - DirectAdmin Deployment Prep"
echo "================================================"
echo ""

# Step 1: Build Frontend
echo "Step 1: Building Frontend..."
cd frontend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully in frontend/dist/"
else
    echo "❌ Frontend build failed!"
    exit 1
fi
cd ..

# Step 2: Export Database
echo ""
echo "Step 2: Exporting Database..."
docker exec backend-mysql-1 mysqldump -u root -proot agewatch community_photos users > deployment/community_photos_export.sql 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Database exported to deployment/community_photos_export.sql"
else
    echo "⚠️  Database export failed (you may need to export manually)"
fi

# Step 3: Create deployment package info
echo ""
echo "Step 3: Creating deployment instructions..."
cat > deployment/DEPLOY_INSTRUCTIONS.txt << 'EOF'
DEPLOYMENT PACKAGE CONTENTS
===========================

1. frontend/dist/
   - Upload ALL files to: public_html/
   - Keep existing api/ folder

2. backend/
   - Upload entire folder to: domains/yourdomain.com/backend/
   - Includes images in: storage/app/public/community-photos/

3. community_photos_export.sql
   - Import via DirectAdmin → MySQL → phpMyAdmin
   - After import, run:
     UPDATE community_photos SET image_url = REPLACE(image_url, 'http://localhost', 'https://api.yourdomain.com');

IMPORTANT STEPS:
===============

1. Backend Setup:
   - Copy backend/public/* to public_html/api/
   - Edit public_html/api/index.php (fix paths)
   - Create backend/.env from .env.example
   - Set permissions: storage/ and bootstrap/cache/ to 775

2. Storage Symlink:
   - Create symlink: public_html/api/storage → ../../backend/storage/app/public
   - OR use .htaccess redirect (see IMAGE_HANDLING_DEPLOYMENT.md)

3. Test URLs:
   - API: https://api.yourdomain.com/api/public/photos
   - Image: https://api.yourdomain.com/storage/community-photos/jim-alvey-1.jpg
   - Frontend: https://yourdomain.com

For detailed instructions, see:
- docs/DEPLOYMENT_DIRECTADMIN.md
- docs/IMAGE_HANDLING_DEPLOYMENT.md
EOF

echo "✅ Instructions created: deployment/DEPLOY_INSTRUCTIONS.txt"

# Step 4: List files to upload
echo ""
echo "================================================"
echo "✅ Deployment Package Ready!"
echo "================================================"
echo ""
echo "Files to upload to DirectAdmin:"
echo "  1. frontend/dist/* → public_html/"
echo "  2. backend/ → domains/yourdomain.com/backend/"
echo "  3. deployment/community_photos_export.sql → Import via phpMyAdmin"
echo ""
echo "Images included:"
ls -lh backend/storage/app/public/community-photos/ 2>/dev/null | grep -v "^total" | wc -l
echo "  images in backend/storage/app/public/community-photos/"
echo ""
echo "Next steps:"
echo "  1. Read deployment/DEPLOY_INSTRUCTIONS.txt"
echo "  2. Read docs/IMAGE_HANDLING_DEPLOYMENT.md for detailed guide"
echo "  3. Login to DirectAdmin and start deployment"
echo ""
