"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-5" />
      
      <div className="relative z-10 container-custom px-4 py-20 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6"
            >
              Welcome to My Portfolio
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Peter Lightspeed
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              Virtual Assistant & Web Developer
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              I create stunning digital experiences through web development, graphic design, and professional virtual assistance. Let's bring your vision to life!
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                View My Work
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-full font-medium hover:border-blue-600 dark:hover:border-blue-500 transition-colors"
              >
                Get In Touch
              </Link>
              <a
                href="/documents/eluwade-peter-toluwanimi-CV.pdf"
                download
                className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="mr-2 w-4 h-4" />
                Download CV
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <Image
                  src="/images/profile/my-pic.png"
                  alt="Peter Lightspeed"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full" />
        </div>
      </div>
    </section>
  )
}
