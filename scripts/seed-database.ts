import { db } from "../server/db";
import { blogPosts, projects, testimonials } from "../shared/schema";

async function seed() {
  console.log("Seeding database...");

  await db.insert(projects).values([
    {
      title: "Lightspeed Hospital",
      slug: "lightspeed-hospital",
      description: "A comprehensive hospital management system with patient records, appointments, and billing features.",
      image: "/images/projects/lightspeed-hospital.png",
      link: "https://lightspeedhospital.netlify.app/",
      tags: ["Web Development", "Healthcare", "Full Stack"],
      featured: true,
    },
    {
      title: "Lightspeed Tube",
      slug: "lightspeed-tube",
      description: "A modern video sharing platform with user-generated content and social features.",
      image: "/images/projects/lightspeed-tube.png",
      link: "https://lightspeedtube.netlify.app/",
      tags: ["Web Development", "Social Media", "Video Platform"],
      featured: true,
    },
  ]);

  await db.insert(testimonials).values([
    {
      name: "Andrew Thompson",
      role: "Business Owner",
      company: "Tech Solutions Ltd",
      content: "Peter delivered an exceptional website that exceeded my expectations. His attention to detail and professionalism made the entire process smooth and enjoyable. Highly recommended!",
      image: "/images/testimonials/andrew.jpg",
      rating: 5,
      approved: true,
    },
    {
      name: "Gideon Oluwapelumi",
      role: "Entrepreneur",
      company: "Digital Ventures",
      content: "Outstanding work! The attention to detail and quality of service is remarkable. Peter not only met our requirements but went above and beyond to ensure everything was perfect.",
      image: "/images/testimonials/gideon-oluwapelumi.jpeg",
      rating: 5,
      approved: true,
    },
    {
      name: "Isaac Martinez",
      role: "Marketing Director",
      company: "Growth Marketing Inc",
      content: "Working with Peter was a game-changer for our business. His digital marketing expertise helped us reach a wider audience and significantly improve our online presence.",
      image: "/images/testimonials/isaac.jpg",
      rating: 5,
      approved: true,
    },
  ]);

  await db.insert(blogPosts).values([
    {
      title: "Getting Started with Modern Web Development",
      slug: "getting-started-modern-web-dev",
      excerpt: "Learn the essential tools and technologies for building modern web applications in 2025.",
      content: "# Getting Started with Modern Web Development\n\nModern web development has evolved significantly...",
      category: "Web Development",
      readTime: "5 min read",
      published: true,
    },
    {
      title: "Design Principles for Better User Experience",
      slug: "design-principles-ux",
      excerpt: "Discover key design principles that will help you create more intuitive and engaging user interfaces.",
      content: "# Design Principles for Better User Experience\n\nGreat design is about more than aesthetics...",
      category: "Design",
      readTime: "7 min read",
      published: true,
    },
  ]);

  console.log("Database seeded successfully!");
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
