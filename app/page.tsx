import HeroSection from "./components/HeroSection";
import VocabularyTrainer from "./components/VocabularyTrainer";
import GrammarDrill from "./components/GrammarDrill";
import PhraseBuilder from "./components/PhraseBuilder";
import LearningPlan from "./components/LearningPlan";
import SkillOverview from "./components/SkillOverview";
import {
  beginnerVocabulary,
  grammarExercises,
  phraseExercises
} from "./data/exercises";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      <section id="cwiczenia" className="section-container flex flex-col gap-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="badge">Ćwiczenia adaptacyjne</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Trenuj islandzki w krótkich, angażujących blokach
          </h2>
          <p className="mt-3 text-slate-300">
            Po każdej turze otrzymasz sugestie powtórek. Algorytm miesza pytania
            i dba o ekspozycję na najważniejsze słowa.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <VocabularyTrainer data={beginnerVocabulary} />
          <GrammarDrill items={grammarExercises} />
        </div>

        <PhraseBuilder exercises={phraseExercises} />
      </section>

      <SkillOverview />
      <LearningPlan />

      <footer className="section-container border-t border-white/5 text-sm text-slate-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Islex. Nauka języka islandzkiego bez barier.
          </p>
          <div className="flex items-center gap-4">
            <a href="#cwiczenia">Ćwiczenia</a>
            <a href="#plan">Plan nauki</a>
            <a href="mailto:hello@islex.app">Kontakt</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
