import type { Metadata } from "next"
import Link from "next/link"
import { Code, Palette, HeadphonesIcon, TrendingUp, Check, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Services",
  description: "Professional web development, graphic design, virtual assistant, and digital marketing services",
}

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Creating stunning, responsive websites tailored to your business needs",
    features: [
      "Custom Website Design",
      "E-commerce Solutions",
      "Landing Pages",
      "Web Applications",
      "Mobile-Responsive Design",
      "SEO Optimization"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Professional visual designs that make your brand stand out",
    features: [
      "Logo Design",
      "Brand Identity",
      "Social Media Graphics",
      "Marketing Materials",
      "UI/UX Design",
      "Print Design"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: HeadphonesIcon,
    title: "Virtual Assistant",
    description: "Reliable administrative support to help your business thrive",
    features: [
      "Email Management",
      "Calendar Scheduling",
      "Data Entry",
      "Customer Support",
      "Research & Analysis",
      "Document Preparation"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Strategic marketing solutions to grow your online presence",
    features: [
      "Social Media Management",
      "Content Creation",
      "SEO Services",
      "Email Marketing",
      "Analytics & Reporting",
      "Brand Strategy"
    ],
    color: "from-orange-500 to-red-500"
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Services
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to help your business succeed in the modern digital landscape
          </p>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="grid gap-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
                    <h3 className="text-xl font-bold mb-6">What's Included:</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
            Need a Custom Solution?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Every project is unique. Let's discuss how I can help achieve your specific goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-medium hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            Contact Me
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
