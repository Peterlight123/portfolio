-- Run this SQL in your Supabase SQL Editor to set up your database

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  read_time VARCHAR(50) NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  tags TEXT[] NOT NULL,
  link VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create newsletter table
CREATE TABLE IF NOT EXISTS newsletter (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for approved testimonials" ON testimonials
  FOR SELECT USING (approved = true);

-- Create policies for public insert (forms)
CREATE POLICY "Enable insert for authenticated and anonymous users" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated and anonymous users" ON newsletter
  FOR INSERT WITH CHECK (true);

-- Seed initial data
INSERT INTO projects (title, description, image, tags, link) VALUES
  ('Lightspeed Hospital', 'A comprehensive hospital management system with patient records, appointments, and billing features.', '/images/projects/lightspeed-hospital.png', ARRAY['Web Development', 'Healthcare', 'Full Stack'], 'https://lightspeedhospital.netlify.app/'),
  ('Lightspeed Tube', 'A modern video sharing platform with user-generated content and social features.', '/images/projects/lightspeed-tube.png', ARRAY['Web Development', 'Social Media', 'Video Platform'], 'https://lightspeedtube.netlify.app/');

INSERT INTO testimonials (name, role, company, content, image, rating, approved) VALUES
  ('Andrew Thompson', 'Business Owner', 'Tech Solutions Ltd', 'Peter delivered an exceptional website that exceeded my expectations. His attention to detail and professionalism made the entire process smooth and enjoyable. Highly recommended!', '/images/testimonials/andrew.jpg', 5, true),
  ('Gideon Oluwapelumi', 'Entrepreneur', 'Digital Ventures', 'Outstanding work! The attention to detail and quality of service is remarkable. Peter not only met our requirements but went above and beyond to ensure everything was perfect.', '/images/testimonials/gideon-oluwapelumi.jpeg', 5, true),
  ('Isaac Martinez', 'Marketing Director', 'Growth Marketing Inc', 'Working with Peter was a game-changer for our business. His digital marketing expertise helped us reach a wider audience and significantly improve our online presence.', '/images/testimonials/isaac.jpg', 5, true);

INSERT INTO blog_posts (title, slug, excerpt, content, category, read_time, published) VALUES
  ('Getting Started with Modern Web Development', 'getting-started-modern-web-dev', 'Learn the essential tools and technologies for building modern web applications in 2025.', 'Full blog content here...', 'Web Development', '5 min read', true),
  ('Design Principles for Better User Experience', 'design-principles-ux', 'Discover key design principles that will help you create more intuitive and engaging user interfaces.', 'Full blog content here...', 'Design', '7 min read', true);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_testimonials_approved ON testimonials(approved);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX idx_newsletter_email ON newsletter(email);
