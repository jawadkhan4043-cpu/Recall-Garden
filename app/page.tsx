"use client";

import { useMemo, useState } from "react";

type Card = {
  id: number;
  topic: string;
  question: string;
  answer: string;
};

const cards: Card[] = [
  {
    id: 1,
    topic: "Learning",
    question: "What is active recall?",
    answer:
      "Trying to remember an idea before looking at the answer. The effort helps strengthen your memory.",
  },
  {
    id: 2,
    topic: "Learning",
    question: "Why take breaks while studying?",
    answer:
      "Short breaks give your attention a chance to recover, making it easier to return focused.",
  },
  {
    id: 3,
    topic: "Science",
    question: "What does a plant need for photosynthesis?",
    answer:
      "Light, water, and carbon dioxide. The plant uses them to make sugar and releases oxygen.",
  },
  {
    id: 4,
    topic: "Science",
    question: "What is the smallest unit of a living thing?",
    answer: "The cell. Every living organism is made of one or more cells.",
  },
  {
    id: 5,
    topic: "Language",
    question: "What is a synonym?",
    answer: "A word with the same or nearly the same meaning as another word.",
  },
];

const topics = ["All topics", ...new Set(cards.map((card) => card.topic))];

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState("All topics");
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [rememberedCards, setRememberedCards] = useState<number[]>([]);

  const visibleCards = useMemo(
    () =>
      selectedTopic === "All topics"
        ? cards
        : cards.filter((card) => card.topic === selectedTopic),
    [selectedTopic],
  );

  function toggleAnswer(id: number) {
    setRevealedCards((current) =>
      current.includes(id)
        ? current.filter((cardId) => cardId !== id)
        : [...current, id],
    );
  }

  function toggleRemembered(id: number) {
    setRememberedCards((current) =>
      current.includes(id)
        ? current.filter((cardId) => cardId !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3" aria-label="Recall Garden home">
            <span className="grid size-11 place-items-center rounded-2xl bg-emerald-700 text-xl text-white">
              ✿
            </span>
            <span className="text-lg font-bold tracking-tight text-emerald-950">
              recall garden
            </span>
          </a>
          <span className="rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-900">
            A little learning, every day
          </span>
        </header>

        <section className="grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
              Your quiet corner to learn
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-tight text-emerald-950 sm:text-6xl">
              Grow what you{" "}
              <span className="font-serif italic text-emerald-700">know.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              Small study sessions add up. Pick a card, try to remember, then
              turn it over and see how you did.
            </p>
            <a
              href="#study"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-950/10 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Start a study session <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -right-4 -top-5 size-24 rounded-full bg-amber-200/70 blur-2xl" />
            <div className="absolute -bottom-5 -left-5 size-28 rounded-full bg-emerald-200/70 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white bg-white/80 p-7 shadow-xl shadow-emerald-950/5 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-500">
                  YOUR GARDEN TODAY
                </span>
                <span className="text-2xl" aria-hidden="true">☀️</span>
              </div>
              <div className="mt-8 flex items-end gap-3">
                <span className="font-serif text-6xl text-emerald-800">
                  {rememberedCards.length}
                </span>
                <span className="pb-2 text-stone-500">
                  of {cards.length} cards remembered
                </span>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all"
                  style={{
                    width: `${(rememberedCards.length / cards.length) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-[#f5f3e9] p-4">
                <span className="text-3xl" aria-hidden="true">🌱</span>
                <p className="text-sm leading-6 text-stone-600">
                  Every card you practice is a seed for stronger memory.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="study" className="scroll-mt-8 pb-16">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                Ready when you are
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-emerald-950">
                Today&apos;s cards
              </h2>
            </div>
            <p className="text-sm text-stone-500">
              {rememberedCards.length} remembered · {cards.length} total
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedTopic === topic
                    ? "bg-emerald-800 text-white"
                    : "border border-emerald-900/10 bg-white/70 text-emerald-900 hover:bg-emerald-50"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {visibleCards.map((card) => {
              const isRevealed = revealedCards.includes(card.id);
              const isRemembered = rememberedCards.includes(card.id);

              return (
                <article
                  key={card.id}
                  className="rounded-3xl border border-emerald-950/10 bg-white/80 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                      {card.topic}
                    </span>
                    {isRemembered && (
                      <span className="text-sm font-semibold text-emerald-700">
                        ✓ Remembered
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 min-h-14 text-xl font-semibold leading-7 text-emerald-950">
                    {card.question}
                  </h3>

                  {isRevealed && (
                    <p className="mt-3 rounded-2xl bg-[#f5f3e9] p-4 leading-7 text-stone-600">
                      {card.answer}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleAnswer(card.id)}
                      className="rounded-full border border-emerald-900/15 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
                    >
                      {isRevealed ? "Hide answer" : "Reveal answer"}
                    </button>
                    {isRevealed && (
                      <button
                        onClick={() => toggleRemembered(card.id)}
                        className="rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        {isRemembered ? "Mark for practice" : "I remembered"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <footer className="border-t border-emerald-950/10 py-6 text-sm text-stone-500">
          Recall Garden · Made for small steps and growing ideas.
        </footer>
      </div>
    </main>
  );
}