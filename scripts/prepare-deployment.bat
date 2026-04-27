@echo off
REM Deployment preparation script for DirectAdmin (Windows)

echo ================================================
echo AgeWatchAfrica - DirectAdmin Deployment Prep
echo ================================================
echo.

REM Create deployment directory if it doesn't exist
if not exist deployment mkdir deployment

REM Step 1: Build Frontend
echo Step 1: Building Frontend...
cd frontend
call npm run build
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Frontend built successfully in frontend/dist/
) else (
    echo [ERROR] Frontend build failed!
    pause
    exit /b 1
)
cd ..

REM Step 2: Export Database
echo.
echo Step 2: Exporting Database...
docker exec backend-mysql-1 mysqldump -u root -proot agewatch community_photos users > deployment\community_photos_export.sql 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Database exported to deployment\community_photos_export.sql
) else (
    echo [WARNING] Database export failed - you may need to export manually
)

REM Step 3: Create deployment instructions
echo.
echo Step 3: Creating deployment instructions...
(
echo DEPLOYMENT PACKAGE CONTENTS
echo ===========================
echo.
echo 1. frontend/dist/
echo    - Upload ALL files to: public_html/
echo    - Keep existing api/ folder
echo.
echo 2. backend/
echo    - Upload entire folder to: domains/yourdomain.com/backend/
echo    - Includes images in: storage/app/public/community-photos/
echo.
echo 3. community_photos_export.sql
echo    - Import via DirectAdmin -^> MySQL -^> phpMyAdmin
echo    - After import, run:
echo      UPDATE community_photos SET image_url = REPLACE^(image_url, 'http://localhost', 'https://api.yourdomain.com'^);
echo.
echo IMPORTANT STEPS:
echo ===============
echo.
echo 1. Backend Setup:
echo    - Copy backend/public/* to public_html/api/
echo    - Edit public_html/api/index.php ^(fix paths^)
echo    - Create backend/.env from .env.example
echo    - Set permissions: storage/ and bootstrap/cache/ to 775
echo.
echo 2. Storage Symlink:
echo    - Create symlink: public_html/api/storage -^> ../../backend/storage/app/public
echo    - OR use .htaccess redirect ^(see IMAGE_HANDLING_DEPLOYMENT.md^)
echo.
echo 3. Test URLs:
echo    - API: https://api.yourdomain.com/api/public/photos
echo    - Image: https://api.yourdomain.com/storage/community-photos/jim-alvey-1.jpg
echo    - Frontend: https://yourdomain.com
echo.
echo For detailed instructions, see:
echo - docs/DEPLOYMENT_DIRECTADMIN.md
echo - docs/IMAGE_HANDLING_DEPLOYMENT.md
) > deployment\DEPLOY_INSTRUCTIONS.txt

echo [SUCCESS] Instructions created: deployment\DEPLOY_INSTRUCTIONS.txt

REM Step 4: Create zip files for easy upload
echo.
echo Step 4: Creating deployment packages...
echo.
echo Creating backend.zip...
powershell -Command "Compress-Archive -Path backend\* -DestinationPath deployment\backend.zip -Force" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] backend.zip created
) else (
    echo [INFO] Could not create backend.zip - upload backend folder manually
)

echo Creating frontend.zip...
powershell -Command "Compress-Archive -Path frontend\dist\* -DestinationPath deployment\frontend.zip -Force" 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] frontend.zip created
) else (
    echo [INFO] Could not create frontend.zip - upload frontend\dist\ folder manually
)

REM Step 5: Summary
echo.
echo ================================================
echo [SUCCESS] Deployment Package Ready!
echo ================================================
echo.
echo Files created in deployment\ folder:
dir /B deployment 2>nul
echo.
echo Images included in backend\storage\app\public\community-photos\:
dir /B backend\storage\app\public\community-photos\ 2>nul | find /C /V ""
echo  images total
echo.
echo Next steps:
echo   1. Read deployment\DEPLOY_INSTRUCTIONS.txt
echo   2. Read docs\IMAGE_HANDLING_DEPLOYMENT.md for detailed guide
echo   3. Upload files to DirectAdmin:
echo      - deployment\backend.zip OR backend\ folder
echo      - deployment\frontend.zip OR frontend\dist\ folder
echo      - deployment\community_photos_export.sql
echo   4. Follow deployment instructions
echo.
pause
