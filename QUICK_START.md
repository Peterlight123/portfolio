# Quick Start Guide

**Your portfolio is ready to deploy!** Here's what you need to know in 5 minutes.

---

## What You Have

✅ Modern Next.js portfolio website  
✅ Database-backed content (Projects, Blog, Testimonials)  
✅ Contact form with email notifications  
✅ Newsletter signup with email alerts  
✅ Dark mode  
✅ Fully responsive design  

---

## Deploy to Vercel (5 Minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Portfolio ready"
git push origin main
```

### 2. Deploy on Vercel
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repo
- Click "Deploy" 

### 3. Set Up Database (Supabase)
- Go to https://supabase.com
- Create new project
- Copy the SQL from `scripts/setup-supabase.sql`
- Run it in Supabase SQL Editor

### 4. Add Environment Variables
In Vercel → Settings → Environment Variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

Get these from: Supabase → Project Settings → API

---

## Your Forms Send Emails

Both forms already work:
- **Contact Form** (`/contact`) → Saves to database + Sends you email
- **Newsletter** (footer) → Saves to database + Sends you email

**Email goes to:** peterlight60@gmail.com

---

## Managing Content

### View Form Submissions
**Supabase Dashboard:**
- Login → Your Project → Table Editor
- Check `contacts` table for contact form submissions
- Check `newsletter` table for email signups

### Add Projects
1. Go to Supabase → `projects` table
2. Click "Insert row"
3. Fill in: title, description, image URL, tags, link
4. Save

### Add Blog Posts
1. Go to Supabase → `blog_posts` table
2. Click "Insert row"
3. Fill in details
4. Set `published = true` to make it live

### Approve Testimonials
1. Go to Supabase → `testimonials` table
2. Find the testimonial
3. Set `approved = true`

---

## File Structure

```
Your Portfolio
├── USER_GUIDE.md         ← Full documentation
├── DEPLOYMENT.md         ← Deployment details
├── QUICK_START.md        ← You are here
├── app/                  ← Website pages
│   ├── page.tsx            ← Home page
│   ├── about/              ← About page
│   ├── projects/           ← Projects page
│   ├── contact/            ← Contact form
│   └── api/                ← Backend endpoints
├── public/
│   ├── images/             ← Your images
│   └── documents/          ← CV/Resume
└── scripts/
    └── setup-supabase.sql  ← Database setup
```

---

## Common Tasks

### Update Your Info
Edit `app/about/page.tsx` for bio and contact details

### Change Profile Picture
Replace `public/images/profile/my-pic.png`

### Update CV/Resume
Replace `public/documents/eluwade-peter-toluwanimi-CV.pdf`

### Customize Colors
Edit `app/globals.css` (search for `--primary`)

---

## Important Links

**Your site is currently at:**
- Vercel (after deploy): https://your-project.vercel.app

**Manage your data:**
- Supabase Dashboard: https://supabase.com/dashboard
- Resend (emails): https://resend.com/emails

**Documentation:**
- Full guide: `USER_GUIDE.md`
- Deployment: `DEPLOYMENT.md`

---

## Need Help?

**Read the full guides:**
1. `USER_GUIDE.md` - Complete website management
2. `DEPLOYMENT.md` - Deployment to Vercel/Netlify

**Test everything:**
- Visit `/contact` and submit a test message
- Check your email for notification
- Check Supabase to see the saved data

---

## ✅ Deployment Checklist

- [ ] Pushed code to GitHub
- [ ] Created Supabase project
- [ ] Ran setup SQL script
- [ ] Deployed to Vercel
- [ ] Added environment variables
- [ ] Tested contact form
- [ ] Verified email notifications work
- [ ] Added real projects to database
- [ ] Updated personal info
- [ ] Uploaded new CV

---

**🎉 That's it! My portfolio is live and fully functional!**

**Next steps:**
1. Add your projects to the database
2. Write blog posts
3. Share my link!

For detailed instructions, see `USER_GUIDE.md`.
