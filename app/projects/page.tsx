import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { db } from "@/server/db"
import { projects } from "@/shared/schema"
import { desc } from "drizzle-orm"

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Peter Lightspeed's portfolio of web development and design projects",
}

export const revalidate = 3600

export default async function ProjectsPage() {
  const projectsData = await db
    .select()
    .from(projects)
    .orderBy(desc(projects.createdAt));
  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my latest work in web development, design, and digital solutions
          </p>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
                    >
                      View Project
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's collaborate to create something amazing together
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-medium hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            Start Your Project
            <ExternalLink className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
