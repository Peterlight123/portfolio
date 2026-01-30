# Peter Lightspeed Portfolio

A modern, full-stack portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and PostgreSQL. Features dynamic content management, contact forms with email notifications, dark mode, and professional animations.

![Portfolio Preview](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

---

## Features

- **Modern Design** - Clean, professional interface with smooth animations
- **Dark Mode** - Automatic theme switching with system preference detection  
- **Fully Responsive** - Optimized for all devices
- **Database-Backed** - Dynamic content from Supabase (PostgreSQL)
- **Email Notifications** - Automatic notifications via Resend
- **Type-Safe** - Built with TypeScript for reliability
- **Optimized** - Fast loading with Next.js ISR and image optimization
- **SEO Ready** - Complete metadata and OpenGraph tags

---

## Quick Start

See **[QUICK_START.md](./QUICK_START.md)** for a 5-minute setup guide.

```bash
npm install
npm run dev
```

Visit `http://localhost:5000`

---

## Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 5 minutes 
- **[USER_GUIDE.md](./USER_GUIDE.md)** - Complete website management guide 
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to github

---

## Tech Stack

**Frontend:** Next.js 16 · TypeScript · Tailwind CSS 4 · Framer Motion  
**Backend:** Supabase (PostgreSQL) · Drizzle ORM · Resend (Email) · Zod  
**Deployment:** Vercel (recommended) · Automatic SSL · Edge Network  

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=re_xxxxxxxxxxxxx 
```

---

## Managing Your Site

### Quick Tasks

**Add a project:**  
Supabase Dashboard → `projects` table → Insert row

**Publish blog post:**  
Supabase Dashboard → `blog_posts` → Set `published = true`

**View contact submissions:**  
Supabase Dashboard → `contacts` table

See [USER_GUIDE.md](./USER_GUIDE.md) for detailed instructions.

---

## Deploying to Production

**Recommended: Vercel**

1. Push to GitHub
2. Import to Vercel  
3. Add environment variables
4. Deploy 

See [DEPLOYMENT.md](./DEPLOYMENT.md) for a complete guide.

---

## About

**Peter Lightspeed** - Virtual Assistant & Web Developer  
Location: Lagos, Nigeria  
email: peterlight60@gmail.com  
Twitter: [@peterlightspeed](https://twitter.com/peterlightspeed)

---

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**
