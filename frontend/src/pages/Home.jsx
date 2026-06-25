import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import AvocadoMark from "../components/AvocadoMark";
import SectionDivider from "../components/SectionDivider";
import ProductCard from "../components/ProductCard";

const whyChooseUs = [
  "Quality seeds with high germination rates",
  "Healthy, disease-free nursery plants",
  "Expert farming guidance from planting to harvest",
  "Bulk orders available for farms and nurseries",
  "Sustainable, water-efficient farming practices",
  "Responsive customer support",
];

const benefits = [
  "High and growing market demand",
  "A strong commercial crop with long-term income potential",
  "Rich in nutrients, valued by health-conscious buyers",
  "Adaptable to a range of climatic conditions",
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setFeatured(res.data.slice(0, 3)))
      .catch(() => setLoadError(true));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-seed">
              Greenstone Avocado Farm &amp; Nursery
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
              Premium avocado seeds, plants &amp; farming solutions
            </h1>
            <p className="text-ink/70 mt-5 text-lg max-w-md">
              Grow a healthy, productive avocado orchard with germination-tested seeds,
              grafted nursery plants, and hands-on guidance from people who farm avocado
              every day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products?category=seed"
                className="px-6 py-3 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors"
              >
                Buy seeds
              </Link>
              <Link
                to="/products?category=plant"
                className="px-6 py-3 rounded-full border border-skin text-skin font-medium hover:bg-skin hover:text-cream transition-colors"
              >
                Buy plants
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full text-ink/70 font-medium hover:text-skin transition-colors"
              >
                Contact us →
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <AvocadoMark size={280} className="drop-shadow-soft" />
            <AvocadoMark
              size={70}
              className="absolute -top-2 right-6 opacity-50 rotate-12"
            />
            <AvocadoMark
              size={50}
              className="absolute bottom-2 left-2 opacity-40 -rotate-6"
            />
          </div>
        </div>
        <div className="bg-skin-dark text-cream text-center py-3 font-display text-sm md:text-base">
          From seed to harvest — supporting farmers every step of the way
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-display text-3xl text-ink">Welcome to Greenstone Farm</h2>
        <p className="text-ink/70 mt-4 leading-relaxed">
          We specialise in cultivating, growing, and supplying premium avocado seeds and
          healthy avocado plants. With a passion for sustainable agriculture and modern
          farming practices, we help farmers, nurseries, and gardening enthusiasts build
          productive avocado plantations — backed by high-germination seeds, disease-free
          plants, and guidance you can actually use.
        </p>
        <Link to="/about" className="inline-block mt-5 text-skin font-medium hover:underline">
          More about us →
        </Link>
      </section>

      <SectionDivider />

      {/* Why choose us */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl text-ink text-center mb-10">Why farmers choose us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item) => (
            <p key={item} className="seed-bullet text-ink/80">
              {item}
            </p>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 bg-white/40 rounded-3xl">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl text-ink">Featured products</h2>
          <Link to="/products" className="text-skin font-medium hover:underline">
            View all →
          </Link>
        </div>

        {loadError && (
          <p className="text-ink/60 text-sm">
            Couldn't load live products right now — make sure the backend API is running.
          </p>
        )}

        {!loadError && featured.length === 0 && (
          <p className="text-ink/60 text-sm">No products published yet. Check back soon.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      {/* Benefits of avocado */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl text-ink text-center mb-10">Why grow avocado?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((item) => (
            <p key={item} className="seed-bullet text-ink/80">
              {item}
            </p>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Testimonials */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl text-ink text-center mb-10">What growers say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <blockquote className="bg-white/60 border border-line rounded-2xl p-6">
            <p className="text-ink/80 italic">
              “The plants were healthy and showed excellent growth after plantation.”
            </p>
            <footer className="mt-3 text-sm font-mono text-seed">— A grower in the network</footer>
          </blockquote>
          <blockquote className="bg-white/60 border border-line rounded-2xl p-6">
            <p className="text-ink/80 italic">
              “High-quality seeds with a good germination rate, batch after batch.”
            </p>
            <footer className="mt-3 text-sm font-mono text-seed">— A nursery owner</footer>
          </blockquote>
        </div>
      </section>

      {/* Farmer support CTA */}
      <section className="bg-skin text-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl">Need guidance, not just plants?</h2>
          <p className="mt-4 text-cream/85 max-w-xl mx-auto">
            We offer support on plantation setup, seed germination, nursery management,
            irrigation planning, and ongoing crop maintenance.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-cream text-skin-dark font-medium hover:bg-flesh-light transition-colors"
          >
            Talk to our team
          </Link>
        </div>
      </section>
    </div>
  );
}
