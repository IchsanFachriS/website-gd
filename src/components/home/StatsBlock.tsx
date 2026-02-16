'use client'

import { motion } from 'framer-motion'
import { Users, GraduationCap, BookOpen, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '50+',
    label: 'Dosen & Staff',
    color: 'text-blue-500',
  },
  {
    icon: GraduationCap,
    value: '500+',
    label: 'Mahasiswa Aktif',
    color: 'text-green-500',
  },
  {
    icon: BookOpen,
    value: '100+',
    label: 'Publikasi per Tahun',
    color: 'text-orange-500',
  },
  {
    icon: Award,
    value: '20+',
    label: 'Penghargaan',
    color: 'text-purple-500',
  },
]

export function StatsBlock() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-white">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 ${stat.color}`}>
                <stat.icon size={32} className="text-white" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}