import AvocadoMark from "../components/AvocadoMark";
import SectionDivider from "../components/SectionDivider";

const milestones = [
  { label: "Seeds supplied", value: "50,000+" },
  { label: "Plants in nurseries", value: "12,000+" },
  { label: "Farmers supported", value: "300+" },
];

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AvocadoMark size={64} className="mx-auto mb-4" />
        <h1 className="font-display text-4xl text-ink">About Greenstone Farm</h1>
        <p className="text-ink/70 mt-5 leading-relaxed max-w-2xl mx-auto">
          We specialise in cultivating, growing, and supplying premium-quality avocado
          seeds and healthy avocado plants. With a passion for sustainable agriculture and
          modern farming practices, we help farmers, nurseries, and gardening enthusiasts
          establish productive avocado plantations.
        </p>
        <p className="text-ink/70 mt-4 leading-relaxed max-w-2xl mx-auto">
          Our goal is simple: high-germination seeds, disease-free plants, and expert
          guidance — so your plantation gets off to the strongest possible start.
        </p>
      </section>

      <section className="bg-white/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-3 gap-8 text-center">
          {milestones.map((m) => (
            <div key={m.label}>
              <div className="font-display text-3xl text-skin-dark">{m.value}</div>
              <div className="text-ink/60 text-sm mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl text-ink text-center mb-8">Our values</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <p className="seed-bullet text-ink/80">Quality seeds, selected from healthy, productive trees</p>
          <p className="seed-bullet text-ink/80">Healthy nursery plants with strong root systems</p>
          <p className="seed-bullet text-ink/80">Expert farming guidance at every stage</p>
          <p className="seed-bullet text-ink/80">Bulk orders for farms, nurseries, and distributors</p>
          <p className="seed-bullet text-ink/80">Sustainable, water-conscious farming practices</p>
          <p className="seed-bullet text-ink/80">Reliable, responsive customer support</p>
        </div>
      </section>
    </div>
  );
}
