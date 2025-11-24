import type { Metadata } from "next"
import Image from "next/image"
import { Code, Palette, HeadphonesIcon, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Peter Lightspeed - Professional Virtual Assistant and Web Developer",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl blur-3xl opacity-30" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/profile/my-pic.png"
                  alt="Peter Lightspeed"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Me
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Hi! I'm Peter Eluwade Toluwanimi, also known as Peter Lightspeed. I'm a passionate web developer, graphic designer, and virtual assistant based in Lagos, Nigeria.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                With over 3 years of experience in the digital space, I've helped numerous clients bring their visions to life through beautiful, functional websites and compelling visual designs.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                I'm also known as "Peterphonist" in the music world, where I showcase my saxophone skills!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            My Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Code, title: "Web Development", desc: "Modern, responsive websites" },
              { icon: Palette, title: "Graphic Design", desc: "Eye-catching visuals" },
              { icon: HeadphonesIcon, title: "Virtual Assistant", desc: "Professional support" },
              { icon: Award, title: "Digital Marketing", desc: "Strategic growth" },
            ].map((skill) => (
              <div key={skill.title} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <skill.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
