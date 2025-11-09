"use client";

import { useMemo, useState } from "react";
import type { GrammarExercise } from "../data/exercises";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type Props = {
  items: GrammarExercise[];
};

type State = {
  answers: Record<string, string>;
  revealed: Record<string, boolean>;
};

export default function GrammarDrill({ items }: Props) {
  const [state, setState] = useState<State>({ answers: {}, revealed: {} });
  const randomized = useMemo(() => shuffle(items), [items]);

  const updateAnswer = (id: string, value: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [id]: value }
    }));
  };

  const reveal = (id: string) => {
    setState((prev) => ({
      ...prev,
      revealed: { ...prev.revealed, [id]: true }
    }));
  };

  const accuracy = useMemo(() => {
    if (!randomized.length) return 0;
    const correct = randomized.filter((item) => {
      const answer = state.answers[item.id]?.trim().toLowerCase();
      return answer && answer === item.answer.toLowerCase();
    }).length;
    return Math.round((correct / randomized.length) * 100);
  }, [randomized, state.answers]);

  return (
    <section className="glass flex flex-col gap-6 rounded-3xl p-8">
      <div>
        <p className="badge">Gramatyka</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">
          Ćwiczenia z końcówkami
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          Uzupełnij brakujące wyrazy lub końcówki. Kliknij „Sprawdź” aby
          zobaczyć odpowiedź i wyjaśnienie.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {randomized.map((task) => {
          const userAnswer = state.answers[task.id] ?? "";
          const isCorrect =
            userAnswer.trim().toLowerCase() === task.answer.toLowerCase();
          const isRevealed = state.revealed[task.id];

          return (
            <div
              key={task.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-white">
                    {task.prompt}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">Wskazówka: {task.hint}</p>
                </div>
                <span className="badge bg-ocean-500/15 text-ocean-100">
                  {isRevealed ? (isCorrect ? "Super!" : "Spróbuj ponownie") : "Wpisz odpowiedź"}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  className={`w-full rounded-2xl border px-4 py-3 text-base font-medium text-white outline-none transition sm:max-w-xs ${
                    isRevealed
                      ? isCorrect
                        ? "border-emerald-400/70 bg-emerald-500/10"
                        : "border-rose-400/70 bg-rose-500/10"
                      : "border-white/10 bg-slate-950/40 focus:border-ocean-400/60"
                  }`}
                  placeholder="Twoja odpowiedź"
                  value={userAnswer}
                  onChange={(event) => updateAnswer(task.id, event.target.value)}
                />
                <button onClick={() => reveal(task.id)} className="btn">
                  Sprawdź
                </button>
              </div>

              {isRevealed ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
                  <p className="font-semibold text-white">
                    Poprawna odpowiedź: <span className="text-ocean-200">{task.answer}</span>
                  </p>
                  <p className="mt-2 text-slate-300">{task.explanation}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-ocean-400/20 bg-ocean-500/10 p-6 text-sm text-ocean-100">
        <p className="font-semibold text-white">Twoja skuteczność: {accuracy}%</p>
        <p className="mt-1 text-ocean-100/80">
          Aby ulepszyć wynik, powtarzaj zadania na głos i porównuj wymowę z
          nagraniami islandzkich lektorów.
        </p>
      </div>
    </section>
  );
}
