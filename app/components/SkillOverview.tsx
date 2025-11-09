import { CheckCircleIcon, FireIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

const focusAreas = [
  {
    name: "Słownictwo",
    score: 72,
    trend: "+12%",
    description: "Powtórz 12 nowych słów o pogodzie i podróżach.",
    icon: FireIcon
  },
  {
    name: "Gramatyka",
    score: 64,
    trend: "+5%",
    description: "Skup się na odmianie czasownika 'að vera' i szyku pytań.",
    icon: CheckCircleIcon
  },
  {
    name: "Wymowa",
    score: 55,
    trend: "nowy",
    description: "Nagraj siebie czytając zdania z dyftongiem 'æ'.",
    icon: SpeakerWaveIcon
  }
];

export default function SkillOverview() {
  return (
    <section className="section-container">
      <div className="mx-auto max-w-3xl text-center">
        <p className="badge">Smart analytics</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Algorytm rozpoznaje Twoje słabe punkty
        </h2>
        <p className="mt-3 text-slate-300">
          Na podstawie ostatnich ćwiczeń przygotowujemy rekomendacje. Dane są
          trzymane lokalnie — pełna prywatność.
        </p>
      </div>

      <div className="card-grid mt-12">
        {focusAreas.map((area) => (
          <article key={area.name} className="card">
            <div className="flex items-center gap-3">
              <area.icon className="h-10 w-10 text-ocean-200" />
              <div>
                <h3 className="card-title">{area.name}</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-ocean-200/80">
                  Postęp {area.trend}
                </p>
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ocean-400 to-ocean-200"
                style={{ width: `${area.score}%` }}
              />
            </div>
            <p className="card-meta">{area.description}</p>
            <button className="btn mt-auto">
              Generuj kolejną serię
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
