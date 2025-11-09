import { AcademicCapIcon, ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";

const milestones = [
  {
    title: "Start w 10 minut",
    description:
      "Powtórka alfabetu, dźwięki specyficzne dla islandzkiego i pierwsze przywitania.",
    icon: SparklesIcon,
    focus: "Fonetyka i podstawowe zwroty",
    duration: "10 min"
  },
  {
    title: "Tydzień 1: Stabilne fundamenty",
    description:
      "Tematy: przedstawianie się, pytania o zamieszkanie, proste czasowniki i wymowa dwugłosek.",
    icon: AcademicCapIcon,
    focus: "Koniugacja czasowników być/mieszkać, pytania",
    duration: "5 sesji po 15 min"
  },
  {
    title: "Tydzień 4: Prawdziwe rozmowy",
    description:
      "Praca nad dialogami o pogodzie, podróżach po Islandii, małych zakupach i planowaniu.",
    icon: ClockIcon,
    focus: "Tryb pytający, formy przymiotników, liczby",
    duration: "3 tygodnie"
  }
];

export default function LearningPlan() {
  return (
    <section id="plan" className="section-container">
      <div className="mx-auto max-w-3xl text-center">
        <p className="badge">Plan nauki</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Mikro cele dopasowane do Twojego kalendarza
        </h2>
        <p className="mt-3 text-slate-300">
          Zwiększaj trudność stopniowo. Każdy etap kończy się krótkim testem
          diagnostycznym oraz rekomendacją kolejnych modułów.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {milestones.map((item) => (
          <article
            key={item.title}
            className="card border-ocean-400/10 bg-gradient-to-b from-slate-950/60 to-slate-900/40"
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-10 w-10 rounded-full border border-white/10 bg-ocean-500/20 p-2 text-ocean-200" />
              <div>
                <h3 className="card-title">{item.title}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-ocean-200/80">
                  {item.focus}
                </p>
              </div>
            </div>
            <p className="card-meta">{item.description}</p>
            <p className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ocean-200">
              {item.duration}
            </p>
            <span className="card-action">
              Zobacz lekcję startową →
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
