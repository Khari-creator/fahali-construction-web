# Fahali Construction Web - Deployment Guide

## ⚠️ CRITICAL: Environment Variables for Vercel

Before the build can succeed on Vercel, you **MUST** set these environment variables in your Vercel project settings:

### Required Environment Variables

1. **DATABASE_URL** (Required)
   ```
   postgresql://postgres.ogpwuefzqwgxgrrdfutr:MySon02Kirsnick09@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
   ```
   - This is essential for Prisma to generate the client during build
   - Without this, the build will fail with "PrismaClient has no exported member" error

2. **ADMIN_EMAIL** (Required)
   ```
   admin@fahali.com
   ```
   - Used for admin authentication

3. **ADMIN_PASSWORD** (Required)
   ```
   StrongAdminPassword123!
   ```
   - Used for admin authentication

4. **NEXT_PUBLIC_SITE_NAME** (Optional but recommended)
   ```
   Fahali Building & Civil Engineering Ltd
   ```

5. **NEXT_PUBLIC_SITE_URL** (Important for production)
   ```
   https://your-vercel-domain.vercel.app
   ```
   - Update this with your actual Vercel domain
   - Currently defaults to http://localhost:3000

### Steps to Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" → "Environment Variables"
3. Add each variable with the values above
4. Redeploy the project

---

## Build Process

The build script has been configured to:

```json
"build": "prisma generate && next build"
```

This ensures Prisma generates the client before Next.js builds. The `postinstall` script also runs Prisma generation after dependency installation.

---

## Database Setup

### Initial Setup
The database schema is automatically created through Prisma migrations:
- `prisma/migrations/20260121090849_init/migration.sql` - Initial schema with projects and admins
- `prisma/migrations/20260121113242_add_project_images/migration.sql` - Adds project gallery images
- Tables: `projects`, `project_images`, and `admins`

#### Data Seeding (Optional)
To add initial project data after deployment:

```bash
npx prisma db seed
```

Note: Seeding is NOT configured to run automatically during build to prevent Vercel build failures.

---

## Project Detail Pages

Projects are now fully clickable with individual detail pages:

- **URL**: `/projects/[slug]`
- **Features**:
  - Displays full project information
  - Shows main project image
  - Displays all gallery images in a grid
  - Project category and featured status
  - Call-to-action to contact
  - Related links to other projects

### Adding Images to Projects

Through the Admin CMS:
1. Create or edit a project
2. Upload the main project image (thumbnail)
3. (Coming soon) Add additional gallery images through CMS

Via API:
```bash
POST /api/projects/images
{
  "projectId": "project-id-here",
  "imageUrl": "https://..."
}
```

## API Endpoints

All API endpoints are now fully functional:

### Public Endpoints
- **GET /api/projects** - Fetch all projects (includes gallery images)
  - Response: `{ success: true, count: number, projects: Project[] }`

- **GET /api/projects/[slug]** - Fetch single project with all images
  - Response: `{ success: true, project: Project }`

### Admin Endpoints (Requires authentication)
- **POST /api/projects** - Create a new project
  - Requires: `title`, `slug`, `category`, `imageUrl`
  - Optional: `description`, `featured`

- **PUT /api/projects** - Update a project
  - Requires: `slug` and `data` object with fields to update

- **DELETE /api/projects** - Delete a project
  - Requires: `slug`

- **POST /api/projects/images** - Add image to project
  - Requires: `projectId`, `imageUrl`
  - Used for adding gallery images

- **DELETE /api/projects/images** - Remove image from project
  - Requires: `imageId`

### Authentication
- **POST /api/auth/login** - Admin login
  - Requires: `email`, `password`
  - Returns: `{ success: true }` with HttpOnly cookie
  - Returns: `{ success: true }` with HttpOnly cookie

### File Upload
- **POST /api/upload** - Upload project images
  - Multipart form data with file

---

## Admin Portal

### Login
- URL: `https://your-domain.vercel.app/admin/login`
- Email: `admin@fahali.com`
- Password: `StrongAdminPassword123!`

### Projects CMS
- URL: `https://your-domain.vercel.app/admin/projects` (after login)
- Features:
  - Add new projects
  - Edit existing projects
  - Delete projects
  - Mark projects as featured (shows on homepage)
  - Upload project images

---

## Troubleshooting

### Build Failure: "PrismaClient is not exported"
**Cause**: DATABASE_URL environment variable not set in Vercel
**Solution**: Add DATABASE_URL to Vercel Environment Variables (see above)

### Build Failure: "The table `projects` does not exist"
**Cause**: Migrations haven't been applied to the database
**Solution**: This should auto-resolve as migrations run, but check that DATABASE_URL is correct

### Projects Not Loading
**Cause**: API responding with wrong data structure
**Solution**: The GET /api/projects now returns `{ success, count, projects }` - all components have been updated to handle this

### Admin Login Shows 404
**Cause**: Middleware routing issue
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Images Not Displaying
**Cause**: imageUrl field not populated
**Solution**: Ensure image is uploaded before saving project

---

## Database Schema

### Projects Table
```sql
CREATE TABLE "projects" (
  "id" TEXT PRIMARY KEY DEFAULT uuid(),
  "title" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "category" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "description" TEXT,
  "featured" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Admins Table
```sql
CREATE TABLE "admins" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

---

## Performance Notes

- Database uses connection pooling via `@prisma/adapter-pg`
- Maximum connection pool size: default (usually 10)
- Consider increasing connections if hitting limits: set `pool_size` in DATABASE_URL

---

## Security Considerations

1. **ADMIN_PASSWORD**: Change this from the default value
2. **HTTPS**: Always use HTTPS in production (Vercel provides this by default)
3. **httpOnly Cookies**: Admin session cookies are httpOnly and sameSite strict
4. **Environment Variables**: Never commit `.env.local` to git (already in .gitignore)

---

## Next Steps

1. ✅ Add all environment variables to Vercel
2. ✅ Trigger a redeploy in Vercel
3. ✅ Test the admin login
4. ✅ Add your first project through the CMS
5. ✅ Verify projects appear on the homepage

---

## Support

For issues or questions, check:
- Build logs in Vercel dashboard
- API responses in browser DevTools
- Prisma documentation: https://www.prisma.io/docs/
