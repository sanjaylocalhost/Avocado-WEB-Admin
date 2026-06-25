import AvocadoMark from "../components/AvocadoMark";

const categories = [
  "Farm photos",
  "Nursery plants",
  "Seed collection",
  "Plantation activities",
  "Harvest photos",
  "Team at work",
];

export default function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl text-ink">Gallery</h1>
        <p className="text-ink/70 mt-3">
          A look at the farm, the nursery, and the seasons in between.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div
            key={c}
            className="aspect-[4/3] rounded-2xl border border-line bg-flesh-light/30 flex flex-col items-center justify-center gap-3"
          >
            <AvocadoMark size={48} className="opacity-50" />
            <span className="font-mono text-xs uppercase tracking-wide text-ink/50">{c}</span>
          </div>
        ))}
      </div>

      <p className="text-center text-ink/50 text-sm mt-10">
        Add your own farm photos here by replacing these placeholders with images stored
        in the <code className="font-mono">image</code> field on each product, or by
        wiring this page up to your own media source.
      </p>
    </div>
  );
}
