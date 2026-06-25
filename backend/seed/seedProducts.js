// Run with: npm run seed
// Creates one admin user and a handful of sample seeds/plants so the
// site has data to show right after setup.
require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");

const sampleProducts = [
  {
    name: "Hass Avocado Seed",
    category: "seed",
    description:
      "Premium Hass avocado seeds harvested from healthy, high-yield trees. High germination rate, ideal for nursery raising or direct sowing.",
    features: ["High germination rate", "Freshly harvested", "Suitable for commercial farming"],
    price: 25,
    unit: "per seed",
    stock: 500,
  },
  {
    name: "Fuerte Avocado Seed",
    category: "seed",
    description:
      "Fuerte variety seeds known for cold tolerance and consistent fruiting, well suited to a range of climates.",
    features: ["Cold tolerant variety", "Bulk quantities available"],
    price: 22,
    unit: "per seed",
    stock: 400,
  },
  {
    name: "Grafted Hass Avocado Plant (1 yr)",
    category: "plant",
    description:
      "One-year-old grafted Hass sapling with a strong root system, ready for transplanting into your orchard.",
    features: ["Strong root system", "Disease-free", "Farm-ready"],
    price: 350,
    unit: "per plant",
    stock: 150,
  },
  {
    name: "Grafted Fuerte Avocado Plant (2 yr)",
    category: "plant",
    description:
      "Two-year-old grafted Fuerte plant, further along in growth with an established root structure for faster establishment.",
    features: ["Established root structure", "Faster fruiting timeline"],
    price: 550,
    unit: "per plant",
    stock: 80,
  },
];

async function seed() {
  await connectDB();

  const adminEmail = "admin@avocadofarm.test";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: "Farm Admin",
      email: adminEmail,
      password: "ChangeMe123!",
      role: "admin",
    });
    console.log(`Admin created -> email: ${adminEmail}  password: ChangeMe123!`);
  } else {
    console.log("Admin user already exists, skipping.");
  }


   const userEmail = "user@avocadofarm.test";
  const existingUser = await User.findOne({ email: userEmail });

  if (!existingUser) {
    await User.create({
      name: "Sanjay",
      email: userEmail,
      password: "123456",
      role: "admin",
    });
    console.log("User created");
  }

  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  console.log(`Inserted ${sampleProducts.length} sample products.`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
