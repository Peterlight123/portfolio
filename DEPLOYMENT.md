# 🚀 Deployment Guide - Peter Lightspeed Portfolio

This guide covers deploying your portfolio to **Vercel** (recommended), **Netlify**, or keeping it on **Replit**.

---

## Option 1: Vercel (Recommended) ⭐

Vercel is built by the creators of Next.js and provides the best performance and developer experience.

### Prerequisites
- GitHub account
- Vercel account (free: https://vercel.com/signup)
- Supabase database set up

### Steps

#### 1. Push Your Code to GitHub

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit - Portfolio ready for deployment"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

#### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your portfolio repository
4. Vercel will auto-detect Next.js settings

#### 3. Configure Environment Variables

In Vercel dashboard:
- Go to **Settings → Environment Variables**
- Add these variables:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database (if using Supabase connection string)
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# Resend (auto-configured if using Replit integration)
# If deploying outside Replit, get API key from Resend:
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**How to get Supabase credentials:**
1. Go to your Supabase dashboard
2. Click **Project Settings → API**
3. Copy `URL` and `anon/public` key

#### 4. Deploy

Click **"Deploy"** - Your site will be live in ~2 minutes at:
```
https://your-project.vercel.app
```

#### 5. Add Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your domain (e.g., `peterlightspeed.com`)
3. Update DNS records as shown by Vercel
4. Wait for SSL certificate (automatic, ~5 minutes)

### Automatic Updates

Every time you push to GitHub, Vercel automatically redeploys:

```bash
git add .
git commit -m "Updated projects"
git push
```

---

## Option 2: Netlify

Netlify is another excellent hosting platform with great features.

### Steps

1. **Build Command Configuration**
   
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Connect your GitHub repo
   - Add environment variables (same as Vercel)
   - Click "Deploy site"

---

## Option 3: Keep on Replit

Your site already works on Replit! Here's how to configure it for production.

### Replit Deployment Steps

1. **Set Production Environment Variables**
   - Go to **Secrets** tab
   - Add all required variables

2. **Configure Deployment**
   
   Your `replit.nix` and `.replit` are already configured.
   
   To deploy:
   - Click **"Deploy"** button in Replit
   - Choose **"Autoscale"** deployment
   - Your site will be at: `https://your-repl.your-username.repl.co`

3. **Custom Domain on Replit**
   - Replit deployments support custom domains
   - Go to Deployment settings → Domains
   - Follow DNS configuration instructions

---

## Database Setup (All Platforms)

### Supabase Setup

1. **Create Supabase Project**
   ```
   https://supabase.com → New Project
   ```

2. **Run SQL Setup Script**
   - Go to **SQL Editor** in Supabase
   - Copy contents of `scripts/setup-supabase.sql`
   - Click **Run**

3. **Verify Tables Created**
   - Go to **Table Editor**
   - You should see: `blog_posts`, `projects`, `testimonials`, `contacts`, `newsletter`

4. **Get Connection Details**
   - **Project Settings → API**
   - Copy:
     - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
     - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Email Setup (Resend)

### For Vercel/Netlify Deployment

If you're not using Replit's integration:

1. **Get Resend API Key**
   - Go to https://resend.com/api-keys
   - Create new API key
   - Copy the key

2. **Add to Environment Variables**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

3. **Update Email Client**
   
   Replace `lib/resend-client.ts` with:
   ```typescript
   import { Resend } from 'resend';
   
   export async function getResendClient() {
     const apiKey = process.env.RESEND_API_KEY;
     
     if (!apiKey) {
       throw new Error('RESEND_API_KEY not configured');
     }
     
     return {
       client: new Resend(apiKey),
       fromEmail: 'onboarding@resend.dev' // or your verified domain
     };
   }
   ```

4. **Verify Sender Domain** (Optional but recommended)
   - Add your domain in Resend dashboard
   - Verify DNS records
   - Use `you@yourdomain.com` as sender

---

## Environment Variables Reference

### Required for All Deployments

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email (choose one)
RESEND_API_KEY=re_xxxxxxxxxxxxx  # For Vercel/Netlify
# OR use Replit Resend integration (auto-configured)
```

### Optional

```env
# Google Analytics (if you add it)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Custom API endpoints
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Contact form works and sends emails
- [ ] Newsletter signup works and sends emails
- [ ] Database queries load data correctly
- [ ] Images display properly
- [ ] Dark mode works
- [ ] Mobile responsive design works
- [ ] SEO metadata appears correctly
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic)

---

## Testing Your Deployment

### 1. Test Forms

**Contact Form:**
```
Visit: https://your-domain.com/contact
Fill out form
Check email for notification
Check Supabase dashboard → contacts table
```

**Newsletter:**
```
Visit: https://your-domain.com
Enter email in newsletter signup
Check email for notification
Check Supabase dashboard → newsletter table
```

### 2. Test Database

```
Visit all pages and verify data loads:
- /projects - Should show projects from database
- /testimonials - Should show approved testimonials
- /blog - Should show published posts
```

### 3. Test Performance

Use these tools:
- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **GTmetrix**: https://gtmetrix.com
- **WebPageTest**: https://www.webpagetest.org

---

## Troubleshooting

### Build Fails

**Error:** `Type error` or `Module not found`

```bash
# Locally test build
npm run build

# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Database Connection Fails

**Error:** `Missing Supabase environment variables`

✅ Check environment variables are set correctly
✅ Ensure `NEXT_PUBLIC_` prefix for client-side vars
✅ Restart deployment after adding variables

### Emails Not Sending

**Error:** `Resend not connected` or emails don't arrive

✅ Check Resend API key is valid
✅ Check Resend dashboard for quota/errors
✅ Verify sender email is configured
✅ Check spam folder
✅ Review deployment logs for email errors

### Images Not Loading

**Error:** 404 on images

✅ Ensure images are in `/public` folder
✅ Use `/images/...` paths (not `public/images/...`)
✅ Check image file names match exactly (case-sensitive)

### Custom Domain Not Working

**Error:** Site not accessible on custom domain

✅ Wait up to 48 hours for DNS propagation
✅ Verify DNS records match Vercel/Netlify instructions
✅ Check domain registrar settings
✅ Ensure HTTPS is enabled

---

## Performance Optimization

### 1. Image Optimization

Already using `next/image` - but ensure:
```typescript
<Image 
  src="/path/to/image.jpg"
  width={800}
  height={600}
  alt="Description"
  priority // For above-fold images
/>
```

### 2. Enable Caching

Already configured via ISR:
```typescript
export const revalidate = 3600 // 1 hour
```

### 3. Monitor Performance

**Vercel Analytics** (free):
- Go to project → Analytics
- View Core Web Vitals
- Monitor real user data

---

## Continuous Deployment

### Workflow

```
1. Make changes locally
2. Test: npm run dev
3. Commit: git add . && git commit -m "Description"
4. Push: git push
5. Auto-deploy happens in ~2 minutes
6. Visit site to verify changes
```

### Branch Previews

Vercel creates preview deployments for every branch:

```bash
git checkout -b feature/new-design
git push origin feature/new-design
# Vercel creates preview URL
# Test at: https://your-project-git-feature-new-design.vercel.app
```

---

## Cost Estimates

### Free Tier Limits

**Vercel Free:**
- 100 GB bandwidth/month
- Unlimited deployments
- Custom domains
- SSL certificates
- Sufficient for portfolio sites

**Supabase Free:**
- 500 MB database
- 1 GB file storage
- 50,000 monthly active users
- Plenty for portfolio + contact forms

**Resend Free:**
- 100 emails/day
- 3,000 emails/month
- Perfect for contact notifications

**Total Cost: $0/month** for most portfolios

### When You Might Need Paid Plans

- **Vercel Pro ($20/mo)**: If you exceed 100GB bandwidth
- **Supabase Pro ($25/mo)**: If you need more database space
- **Resend ($20/mo)**: If you send 3,000+ emails/month

---

## Security Best Practices

1. **Never commit secrets**
   ```bash
   # Verify .gitignore includes:
   .env
   .env.local
   .env.*.local
   ```

2. **Use environment variables**
   - All API keys in environment variables
   - Never hardcode credentials

3. **Enable Supabase Row Level Security**
   - Already configured in setup script
   - Prevents unauthorized data access

4. **Keep dependencies updated**
   ```bash
   npm update
   npm audit fix
   ```

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs

---

**🎉 Your portfolio is now live!** Share your link and start receiving opportunities!
