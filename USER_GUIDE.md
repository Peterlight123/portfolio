# 🚀 Peter Lightspeed Portfolio - User Guide

Welcome to your modern portfolio website! This guide will help you manage and customize your site effectively.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Managing Your Website](#managing-your-website)
3. [Database Management](#database-management)
4. [Email Notifications](#email-notifications)
5. [Deployment Guide](#deployment-guide)
6. [Common Tasks](#common-tasks)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Quick Start

### What You Have

Your portfolio is a **full-stack Next.js application** with:
- ✅ Modern, responsive design with dark mode
- ✅ Database-backed content (Projects, Blog, Testimonials)
- ✅ Contact form & Newsletter subscription
- ✅ Email notifications via Resend
- ✅ SEO optimized with metadata
- ✅ Ready for Vercel deployment

### Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend integration
- **Hosting**: Vercel (recommended) or Replit
- **Version Control**: Git & GitHub

---

## 🛠️ Managing Your Website

### 1. **Updating Your Profile Information**

#### Edit Your Bio & Contact Info
Go to `app/about/page.tsx` and update:
```typescript
const bio = "Your updated biography here..."
const email = "your-email@example.com"
const phone = "+234 XXX XXX XXXX"
```

#### Change Profile Picture
Replace the image at:
```
public/images/profile/my-pic.png
```

### 2. **Managing Services**

Edit services in `app/services/page.tsx`:
```typescript
const services = [
  {
    title: "Your Service Name",
    description: "Service description",
    features: ["Feature 1", "Feature 2"],
    price: "$500"
  }
]
```

### 3. **Updating Certifications**

Edit `app/certifications/page.tsx`:
```typescript
const certifications = [
  {
    title: "Certification Name",
    issuer: "Issuing Organization",
    date: "2025",
    image: "/path/to/logo.png"
  }
]
```

---

## 💾 Database Management

### Accessing Your Database

Your website uses **Supabase** for storing:
- 📝 Blog posts
- 🖼️ Projects
- ⭐ Testimonials
- 📧 Contact form submissions
- 📬 Newsletter subscribers

### How to View & Edit Data

1. **Log in to Supabase Dashboard**
   - Go to: https://supabase.com
   - Sign in with your account
   - Select your project

2. **View Tables**
   - Click "Table Editor" in the sidebar
   - You'll see: `blog_posts`, `projects`, `testimonials`, `contacts`, `newsletter`

3. **Add New Content**
   
   #### Adding a New Project:
   - Go to `projects` table
   - Click "Insert" → "Insert row"
   - Fill in:
     - `title`: Project name
     - `description`: Project description
     - `image`: Image URL or path
     - `tags`: JSON array like `["Web Development", "React"]`
     - `link`: Project URL

   #### Adding a Blog Post:
   - Go to `blog_posts` table
   - Click "Insert" → "Insert row"
   - Fill in:
     - `title`: Post title
     - `slug`: URL-friendly version (e.g., "my-first-post")
     - `excerpt`: Short summary
     - `content`: Full article text
     - `category`: Category name
     - `read_time`: "5 min read"
     - `published`: Check this box to make it live

   #### Approving Testimonials:
   - Go to `testimonials` table
   - Find the testimonial
   - Set `approved` to `true`

### Database Schema

Your database has these tables:

```sql
blog_posts
├── id (auto-generated)
├── title
├── slug
├── excerpt
├── content
├── category
├── read_time
├── published (true/false)
└── created_at

projects
├── id
├── title
├── description
├── image
├── tags (JSON array)
├── link
└── created_at

testimonials
├── id
├── name
├── role
├── company
├── content
├── image
├── rating (1-5)
├── approved (true/false)
└── created_at

contacts
├── id
├── name
├── email
├── subject
├── message
└── created_at

newsletter
├── id
├── email
└── created_at
```

### Connecting Supabase

If you haven't set up Supabase yet:

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Click "Start your project"
   - Create a new project

2. **Get Your Connection Details**
   - Go to Project Settings → API
   - Copy:
     - `Project URL`
     - `anon/public key`

3. **Add to Environment Variables**
   - In Replit: Go to Secrets tab
   - Add:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```
   - In Vercel: Go to Project Settings → Environment Variables

4. **Run Database Setup**
   ```bash
   npm run db:setup
   ```

---

## 📧 Email Notifications

### How Email Works

When visitors submit forms, you receive automatic email notifications via Resend.

#### Email Triggers:
- ✉️ **Contact Form**: Get notified when someone contacts you
- 📬 **Newsletter Signup**: Get notified of new subscribers

### Resend Configuration

Already connected! Your emails are sent from:
- **From Email**: The email you configured in Resend
- **To Email**: Your email (peterlight60@gmail.com)

### Customizing Email Templates

Edit email content in:
- Contact form emails: `app/api/contact/route.ts`
- Newsletter emails: `app/api/newsletter/route.ts`

Example:
```typescript
await resend.emails.send({
  from: fromEmail,
  to: 'your-email@gmail.com',
  subject: 'New Contact Form Submission',
  html: `
    <h2>New Message from ${name}</h2>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong> ${message}</p>
  `
});
```

---

## 🚀 Deployment Guide

### Deploying to Vercel (Recommended)

Vercel is the fastest way to deploy your Next.js site.

#### First-Time Setup:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all your secrets:
     ```
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     DATABASE_URL=... (if using Supabase)
     ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `your-project.vercel.app`

#### Updating Your Site:

Every time you push to GitHub, Vercel automatically redeploys:
```bash
git add .
git commit -m "Updated projects"
git push origin main
```

### Custom Domain

1. Go to Vercel → Your Project → Settings → Domains
2. Add your custom domain (e.g., `peterlightspeed.com`)
3. Follow DNS configuration instructions

---

## 📝 Common Tasks

### 1. **Update Your CV/Resume**

Replace the file at:
```
public/documents/eluwade-peter-toluwanimi-CV.pdf
```

### 2. **Change Colors/Theme**

Edit `app/globals.css`:
```css
:root {
  --primary: 220 100% 50%; /* Blue */
  --secondary: 280 100% 60%; /* Purple */
}
```

### 3. **Add Social Media Links**

Edit `app/components/layout/Footer.tsx`:
```typescript
const socialLinks = [
  { icon: FaTwitter, href: "https://twitter.com/peterlightspeed" },
  { icon: FaInstagram, href: "https://instagram.com/eluwadepeter" },
  // Add more...
]
```

### 4. **Update Chatbot Responses**

The chatbot is in `app/components/sections/Chatbot.tsx`.
Edit the knowledge base:
```typescript
const responses = {
  "hello": "Hi! How can I help you today?",
  "services": "I offer web development, graphic design...",
  // Add more responses
}
```

### 5. **View Form Submissions**

**Option 1: Supabase Dashboard**
- Go to Table Editor → `contacts` or `newsletter`

**Option 2: Email Notifications**
- You'll receive emails for each submission

**Option 3: Export Data**
- In Supabase: Select table → Click "..." → Export as CSV

---

## 🔧 Troubleshooting

### Build Errors

If you get build errors:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues

```bash
# Test database connection
npm run db:studio

# Re-sync schema
npm run db:push
```

### Forms Not Working

1. Check environment variables are set
2. Verify Supabase connection
3. Check browser console for errors
4. Ensure Resend is properly connected

### Email Not Sending

1. Check Resend dashboard for quota
2. Verify `from_email` is verified in Resend
3. Check spam folder
4. Review API logs in Resend dashboard

### Dark Mode Not Working

Clear browser cache or check:
```typescript
// In app/layout.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
```

---

## 🎨 Customization Tips

### Adding New Pages

1. Create file: `app/new-page/page.tsx`
2. Add to navigation: `app/components/layout/Navigation.tsx`
3. Add metadata for SEO

### Changing Fonts

Edit `app/layout.tsx`:
```typescript
import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
})
```

### Performance Optimization

- Use `next/image` for all images
- Add `loading="lazy"` for below-fold images
- Enable ISR: `export const revalidate = 3600`

---

## 📞 Support & Resources

### Official Documentation
- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Resend**: https://resend.com/docs
- **Vercel**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

### Useful Commands

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:studio        # Open database GUI
npm run db:push          # Update database schema
npm run db:seed          # Seed with sample data

# Deployment
npm run build            # Build for production
npm start                # Start production server
```

### Getting Help

- **Next.js Issues**: Check build logs
- **Database Issues**: Check Supabase logs
- **Email Issues**: Check Resend dashboard
- **Deployment Issues**: Check Vercel deployment logs

---

## 🎯 Best Practices

1. **Regular Backups**
   - Export Supabase data weekly
   - Keep Git commits organized

2. **Security**
   - Never commit API keys
   - Use environment variables
   - Keep dependencies updated: `npm update`

3. **Performance**
   - Optimize images before uploading
   - Use ISR for static content
   - Monitor Vercel analytics

4. **Content Management**
   - Write blog posts in Markdown
   - Use descriptive slugs for SEO
   - Add alt text to all images

---

## 🚦 Quick Reference

### File Structure
```
├── app/                    # Pages & routes
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── api/               # API endpoints
│   └── components/        # React components
├── public/                # Static files
│   ├── images/           # Images
│   └── documents/        # PDFs, files
├── lib/                   # Utilities
├── shared/               # Shared code (schema)
└── server/               # Server-side code
```

### Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Resend (auto-configured via Replit integration)
```

---

## ✅ Checklist Before Going Live

- [ ] Updated all personal information
- [ ] Added real projects to database
- [ ] Tested contact form
- [ ] Verified email notifications work
- [ ] Added custom domain to Vercel
- [ ] Set up Google Analytics (optional)
- [ ] Tested on mobile devices
- [ ] Checked all links work
- [ ] Updated CV/resume
- [ ] SEO metadata is complete

---

**🎉 Congratulations!** You now have a modern, professional portfolio website. Keep it updated with your latest work and achievements!

For questions or issues, refer to the documentation links above or check the Replit/Vercel logs for debugging information.

**Made with ❤️ by Peter Lightspeed**
