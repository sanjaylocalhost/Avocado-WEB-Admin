import { Link } from "react-router-dom";
import SectionDivider from "../components/SectionDivider";

const highlights = [
  "Organic-friendly cultivation methods",
  "Water-efficient drip irrigation",
  "Regular plant health monitoring",
  "Focus on consistent fruit quality",
  "Sustainable, long-term farming techniques",
];

const support = [
  "Plantation setup",
  "Seed germination",
  "Nursery management",
  "Irrigation planning",
  "Crop maintenance",
];

const faqs = [
  {
    q: "What is the germination rate of your avocado seeds?",
    a: "Our seeds are hand-selected from healthy, productive trees to give you a high and consistent germination rate.",
  },
  {
    q: "Do you provide bulk orders?",
    a: "Yes — bulk orders are available for farms, nurseries, and distributors. Get in touch with your quantity and we'll work out pricing.",
  },
  {
    q: "Do you provide farming guidance?",
    a: "Yes, we offer guidance on plantation setup, germination, nursery management, irrigation, and crop maintenance.",
  },
];

export default function Farming() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-display text-4xl text-ink">Our farming practices</h1>
        <p className="text-ink/70 mt-5 leading-relaxed">
          We cultivate avocados using modern, sustainable agricultural methods. Our farm
          follows best practices in irrigation, soil management, nutrition, and plant
          health monitoring to ensure healthy growth and reliable yields.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <ul className="space-y-3">
          {highlights.map((h) => (
            <li key={h} className="seed-bullet text-ink/80 text-lg">
              {h}
            </li>
          ))}
        </ul>
      </section>

      <SectionDivider />

      <section className="bg-skin text-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl">Need guidance?</h2>
          <p className="mt-4 text-cream/85">We provide consultation on:</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {support.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full border border-cream/40 text-sm font-medium"
              >
                {s}
              </span>
            ))}
          </div>
          <Link
            to="/contact"
            className="inline-block mt-8 px-6 py-3 rounded-full bg-cream text-skin-dark font-medium hover:bg-flesh-light transition-colors"
          >
            Ask our team
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl text-ink text-center mb-10">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-line pb-5">
              <h3 className="font-display text-lg text-ink">{f.q}</h3>
              <p className="text-ink/70 mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
