CI / Deployment checklist

1. Add repository secrets in GitHub (Settings → Secrets → Actions):
   - `DATABASE_URL` (use Supabase pooler URL with `?sslmode=require`)
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD` (for seeding)

2. Connect repository to Vercel and set the same ENV variables in Vercel Project Settings (Environment Variables), including:
   - `DATABASE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE` (server-only)
   - `SUPABASE_ANON_KEY` (client)
   - `SUPABASE_STORAGE_BUCKET=project-images`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`

3. GitHub Actions `prisma-deploy.yml` will run on pushes to `main` and deploy migrations + seed.

4. On Vercel deployment ensure `build` runs `prisma generate` (already in `package.json` scripts).

5. After deploy to Vercel, confirm app can access DB and storage by visiting `/admin/login` and performing a login, project create and upload.
