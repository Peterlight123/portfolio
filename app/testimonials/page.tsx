import type { Metadata } from "next"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { db } from "@/server/db"
import { testimonials } from "@/shared/schema"
import { eq, desc } from "drizzle-orm"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with Peter Lightspeed",
}

export const revalidate = 3600

export default async function TestimonialsPage() {
  const testimonialsData = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.approved, true))
    .orderBy(desc(testimonials.createdAt));
  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container-custom text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Quote className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Client Testimonials
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take my word for it - here's what clients have to say about working together
          </p>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-blue-500 opacity-50 mb-4" />
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join These Happy Clients?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's work together to bring your vision to life
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-medium hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  )
}
