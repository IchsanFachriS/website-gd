'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { HeroSlide } from '@/types'

interface HeroProps {
  slides: HeroSlide[]
}

export function Hero({ slides }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  const SLIDE_DURATION = 5000

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((current) => (current + 1) % slides.length)
          return 0
        }
        return prev + (100 / (SLIDE_DURATION / 100))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  const goToPrevious = () => {
    setCurrentSlide((current) => (current - 1 + slides.length) % slides.length)
    setProgress(0)
  }

  const goToNext = () => {
    setCurrentSlide((current) => (current + 1) % slides.length)
    setProgress(0)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (!slides || slides.length === 0) return null

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.75, 0, 0.25, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

          {/* Content */}
          <div className="container relative h-full flex items-center">
            <div className="max-w-2xl lg:max-w-3xl text-white">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-4 lg:mb-6 leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h1>

              {slides[currentSlide].subtitle && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8 text-white/90"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href={slides[currentSlide].ctaLink}
                  className="inline-block bg-secondary hover:bg-secondary-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-xl text-sm md:text-base"
                >
                  {slides[currentSlide].ctaText}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 lg:gap-4 z-10">
        {/* Progress Bar */}
        <div className="w-1 h-12 lg:h-16 bg-white/30 rounded-full overflow-hidden hidden md:block">
          <motion.div
            className="w-full bg-white rounded-full"
            style={{ height: `${progress}%` }}
          />
        </div>

        {/* Play/Pause */}
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Previous */}
        <button
          onClick={goToPrevious}
          className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Next */}
        <button
          onClick={goToNext}
          className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              setProgress(0)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}