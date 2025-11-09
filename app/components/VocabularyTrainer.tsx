"use client";

import { useMemo, useState } from "react";
import type { VocabularyItem } from "../data/exercises";

const MAX_QUESTIONS = 6;

type Props = {
  data: VocabularyItem[];
};

type Question = VocabularyItem & { options: string[] };

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createQuestions(data: VocabularyItem[]): Question[] {
  return data.slice(0, MAX_QUESTIONS).map((item) => {
    const options = shuffle([item.polish, ...item.distractors]).slice(0, 4);
    return { ...item, options };
  });
}

export default function VocabularyTrainer({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const questions = useMemo(() => createQuestions(shuffle(data)), [data]);
  const current = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (completed || selected) return;
    setSelected(option);
    if (option === current.polish) {
      setScore((prev) => prev + 1);
    }
    if (currentIndex === questions.length - 1) {
      setCompleted(true);
    } else {
      setTimeout(() => {
        setSelected(null);
        setCurrentIndex((prev) => prev + 1);
      }, 900);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setCompleted(false);
  };

  return (
    <div className="surface glass flex flex-col gap-6 rounded-3xl p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="badge">Słownictwo</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Dopasuj tłumaczenie
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Wybierz poprawne tłumaczenie islandzkiego słowa. Punkty liczą się
            tylko za pierwszą próbę!
          </p>
        </div>
        <div className="text-right text-sm text-slate-300">
          <p className="font-semibold text-white">
            {score} / {questions.length}
          </p>
          <p>Postęp</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-ocean-200/90">
              Pytanie {currentIndex + 1}
            </p>
            <p className="mt-2 text-3xl font-bold text-white">{current.icelandic}</p>
          </div>
          {current.note ? (
            <span className="badge bg-ocean-500/20 text-ocean-100">
              {current.note}
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3">
          {current.options.map((option) => {
            const isCorrect = option === current.polish;
            const isSelected = selected === option;
            const showState = isSelected || (completed && isCorrect);
            return (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`w-full rounded-2xl border px-5 py-4 text-left text-base font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-200 ${
                  showState
                    ? isCorrect
                      ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
                      : "border-rose-400/60 bg-rose-400/10 text-rose-100"
                    : "border-white/5 bg-slate-950/40 text-slate-100 hover:border-ocean-400/40 hover:bg-ocean-500/10"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {completed ? (
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-ocean-500/20 to-ocean-300/10 p-6 text-sm text-slate-100">
          <p className="text-lg font-semibold text-white">
            Świetna robota! Twój wynik to {score} punktów.
          </p>
          <p>
            Spróbuj jeszcze raz, aby wzmocnić pamięć. Powtórki rozciągnięte w
            czasie wzmacniają zapamiętywanie.
          </p>
          <button onClick={restart} className="btn self-start">
            Zacznij ponownie
          </button>
        </div>
      ) : null}
    </div>
  );
}
