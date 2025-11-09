"use client";

import { useMemo, useState } from "react";
import type { PhraseExercise } from "../data/exercises";

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

type Props = {
  exercises: PhraseExercise[];
};

type Step = {
  tokens: string[];
  answer: string[];
};

export default function PhraseBuilder({ exercises }: Props) {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<Step>(() => ({
    tokens: shuffle(exercises[0]?.tokens ?? []),
    answer: []
  }));
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const current = useMemo(() => exercises[index], [exercises, index]);

  const handleTokenClick = (
    token: string,
    position: number,
    source: "pool" | "answer"
  ) => {
    if (!current) return;
    if (completed) return;

    setStep((prev) => {
      const nextTokens = [...prev.tokens];
      const nextAnswer = [...prev.answer];

      if (source === "pool") {
        nextTokens.splice(position, 1);
        nextAnswer.push(token);
      } else {
        nextAnswer.splice(position, 1);
        nextTokens.push(token);
      }

      return { tokens: nextTokens, answer: nextAnswer };
    });
    setFeedback(null);
  };

  const verify = () => {
    if (!current) return;
    const isCorrect = step.answer.join(" ") === current.solution.join(" ");
    if (isCorrect && index === exercises.length - 1) {
      setCompleted(true);
      setFeedback("Świetnie! Ułożyłeś wszystkie zdania.");
    } else if (isCorrect) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setStep({
        tokens: shuffle(exercises[nextIndex].tokens),
        answer: []
      });
      setFeedback("Zadanie rozwiązane poprawnie! Przejdź do kolejnego.");
    } else {
      setFeedback("Sprawdź kolejność i akcenty. Spróbuj ponownie.");
      const nextTokens = shuffle([...step.tokens, ...step.answer]);
      setStep({ tokens: nextTokens, answer: [] });
    }
  };

  const resetCurrent = () => {
    if (!current) return;
    setStep({ tokens: shuffle(current.tokens), answer: [] });
    setFeedback(null);
  };

  if (!current) return null;

  const isCorrect =
    step.answer.length === current.solution.length &&
    step.answer.every((token, idx) => token === current.solution[idx]);

  return (
    <div className="glass flex flex-col gap-6 rounded-3xl p-8">
      <div className="flex flex-col gap-2">
        <p className="badge">Budowanie zdań</p>
        <h3 className="text-2xl font-semibold text-white">Ułóż poprawne zdanie</h3>
        <p className="text-sm text-slate-300">
          Klikaj słowa, aby ułożyć islandzkie zdanie odpowiadające tłumaczeniu.
          Możesz usuwać słowa klikając je ponownie.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-200">
        <p className="font-semibold text-white">{current.translation}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ocean-200">
          Zadanie {index + 1} / {exercises.length}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          {step.tokens.map((token, tokenIndex) => (
            <button
              key={`${token}-${tokenIndex}`}
              onClick={() => handleTokenClick(token, tokenIndex, "pool")}
              className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-medium text-white transition hover:border-ocean-400/40 hover:bg-ocean-500/10"
            >
              {token}
            </button>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-ocean-200">
            Twoje zdanie
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {step.answer.length ? (
              step.answer.map((token, tokenIndex) => (
                <button
                  type="button"
                  key={`${token}-selected-${tokenIndex}`}
                  onClick={() => handleTokenClick(token, tokenIndex, "answer")}
                  className="rounded-full border border-ocean-400/40 bg-ocean-500/20 px-4 py-2 text-sm font-semibold text-ocean-50 transition hover:bg-ocean-400/30"
                >
                  {token}
                </button>
              ))
            ) : (
              <span className="text-sm text-slate-400">
                Kliknij słowa powyżej, aby zbudować zdanie.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={verify} className="btn">
          Sprawdź zdanie
        </button>
        <button
          onClick={resetCurrent}
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-ocean-400/40 hover:text-ocean-100"
        >
          Wymieszaj ponownie
        </button>
        {isCorrect ? (
          <span className="badge bg-emerald-500/20 text-emerald-100">
            Doskonale! Możesz przejść dalej.
          </span>
        ) : null}
      </div>

      {feedback ? (
        <p className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-200">
          {feedback}
        </p>
      ) : null}

      {completed ? (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-sm text-emerald-100">
          <p className="text-lg font-semibold text-white">
            Opanowane! Wszystkie zdania zostały zbudowane poprawnie.
          </p>
          <p className="mt-1 text-emerald-100/80">
            Spróbuj teraz zapisać je w zeszycie lub nagrać swoje nagranie z
            islandzką wymową.
          </p>
        </div>
      ) : null}
    </div>
  );
}
