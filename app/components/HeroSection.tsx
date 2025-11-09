"use client";

import { motion } from "framer-motion";
import { SparklesIcon, AcademicCapIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const floatingParticles = Array.from({ length: 24 }).map((_, index) => ({
  id: index,
  delay: Math.random() * 3,
  x: Math.random() * 100 - 50,
  y: Math.random() * 100 - 50,
  scale: Math.random() * 0.7 + 0.3
}));

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24">
      <div className="absolute inset-0">
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute h-2 w-2 rounded-full bg-ocean-400/60"
            initial={{ opacity: 0, scale: particle.scale }}
            animate={{
              opacity: [0, 1, 0],
              y: [particle.y - 30, particle.y + 30],
              x: [particle.x - 20, particle.x + 20]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
            style={{ left: `${50 + particle.x}%`, top: `${50 + particle.y}%` }}
          />
        ))}
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-10 py-16 text-center"
        >
          <div className="title-shape" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="badge"
          >
            <SparklesIcon className="h-4 w-4" />
            Islandzki w wersji interaktywnej
          </motion.div>

          <h1 className="gradient-text text-4xl font-bold leading-tight sm:text-5xl">
            Islex: Twoje centrum nauki islandzkiego online
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-200">
            Poznaj islandzki poprzez aktywne ćwiczenia, gry konwersacyjne i
            inteligentną analizę Twoich odpowiedzi. Zaprojektowane dla
            samouków, lektorów i miłośników Północy.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#cwiczenia" className="btn">
              Rozpocznij trening
            </a>
            <a
              href="#plan"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-ocean-400/40 hover:text-ocean-100"
            >
              Zobacz plan nauki
            </a>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-left">
              <AcademicCapIcon className="h-8 w-8 text-ocean-300" />
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-ocean-300/80">
                Ćwiczenia progresywne
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Zadania dopasowują się do Twojej skuteczności dzięki analizie
                odpowiedzi w czasie rzeczywistym.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-left">
              <GlobeAltIcon className="h-8 w-8 text-ocean-300" />
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-ocean-300/80">
                Kontekst kulturowy
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Poznawaj idiomy i realia Islandii dzięki komentarzom i mini
                ciekawostkom.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-left">
              <SparklesIcon className="h-8 w-8 text-ocean-300" />
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-ocean-300/80">
                Motywacja i nawyki
              </p>
              <p className="mt-2 text-sm text-slate-300">
                System przypomnień i mikro-celów pomaga utrzymać regularność
                nauki.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
