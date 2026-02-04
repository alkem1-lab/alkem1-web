# Deploy to Vercel (GitHub → auto-update)

## 1. Push to GitHub

```bash
cd /path/to/your/repo
git add .
git commit -m "Website: English copy, gate, logo, Council/E2E"
git push origin main
```

(Use your branch name if not `main`.)

## 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. **Add New** → **Project** → **Import Git Repository**.
3. Select your GitHub repo and import.
4. **Root Directory:** set to the folder that contains `package.json`:
   - If the repo root is `apps/website`, set **Root Directory** to `app`.
   - If the repo root is `02_ALKEM1_LAB2` (monorepo), set it to `apps/website/app`.
5. **Environment Variables:** add:
   - `NEXT_PUBLIC_SITE_PASSWORD` = your gate password (e.g. `pandora`).
6. Click **Deploy**.

## 3. Auto-update (webhook)

After the project is imported from GitHub, Vercel automatically:

- Builds and deploys on every push to the default branch.
- Rebuilds on pull requests (preview deployments).

No extra webhook setup is needed. Push to GitHub → Vercel runs a new build and updates the live site.

## 4. Optional: custom domain

In the Vercel project: **Settings** → **Domains** → add your domain and follow the DNS instructions.
