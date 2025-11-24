import type { Metadata } from "next"
import Image from "next/image"
import { Award, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Certifications",
  description: "Professional certifications and achievements in web development and design",
}

const certifications = [
  {
    title: "Google Digital Marketing Certification",
    issuer: "Google",
    date: "2024",
    image: "/images/certificates/google-cert.png",
    logo: "/images/logos/google.png",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    image: "/images/certificates/freecodecamp-cert.png",
    logo: "/images/certificates/freecodecamp.png",
  },
  {
    title: "AI & Machine Learning Fundamentals",
    issuer: "AI Academy",
    date: "2024",
    image: "/images/certificates/ai.webp",
    logo: "/images/logos/ai-logo.jpeg",
  },
]

export default function CertificationsPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container-custom text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certifications & Achievements
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Continuous learning and professional development in web technologies and digital marketing
          </p>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 bg-white dark:bg-gray-700 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={cert.logo}
                        alt={cert.issuer}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Issued: {cert.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Committed to Excellence</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I continuously invest in learning and professional development to stay current with the latest technologies and best practices in web development and digital marketing.
          </p>
        </div>
      </section>
    </div>
  )
}
