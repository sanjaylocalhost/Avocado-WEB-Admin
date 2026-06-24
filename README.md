# Greenstone Avocado Farm & Nursery — Website

A content website for an avocado seed/plant nursery business, built with:

- **Frontend:** React (Vite) + Tailwind CSS + React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose

## What it does

- Public content pages: Home, About, Products, Farming, Gallery, Contact
- A product catalog (seeds & plants) stored in MongoDB
- Customer accounts (signup/login) — customers can send inquiries about
  products or general questions, and track their own inquiry history
- An admin panel (separate login) to add/edit/delete products and to view
  and respond to customer inquiries
- This is **not** an online store — there's no cart or payment. Customers
  inquire, and the farm follows up directly (matching the "content site +
  inquiry form" scope).

## Project structure

```
avocado-website/
  backend/    Express API + MongoDB models
  frontend/   React app (Vite)
```

## 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB database — either:
  - **Local MongoDB** (install MongoDB Community Server and run it), or
  - **MongoDB Atlas** (free tier) — create a cluster and get a connection
    string

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and set:

- `MONGO_URI` — your local or Atlas connection string
- `JWT_SECRET` — any long random string
- `CLIENT_ORIGIN` — leave as `http://localhost:5173` for local development

Seed an admin account and a few sample products:

```bash
npm run seed
```

This prints the admin login (`admin@avocadofarm.test` / `ChangeMe123!`).
**Log in once after seeding and treat this as a real password — change it
or create a new admin user and remove this one before going live.**

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health`
in a browser to confirm it's up.

## 3. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The site runs at `http://localhost:5173`.

## 4. Using the site

- Browse products at **/products**, filter by seeds or plants
- Create a customer account at **/signup**, then send an inquiry from a
  product page or **/contact**
- Log in to the admin panel at **/admin/login** with the seeded admin
  account to add real products and respond to inquiries

## 5. Going live (high level)

- Swap placeholder content (phone, email, address, gallery photos) for
  real ones in `frontend/src/pages` and `frontend/src/components/Footer.jsx`
- Add real product images — either host them somewhere and paste the URL
  into the admin product form, or extend the backend to accept file
  uploads
- Deploy the backend (e.g. Render, Railway, a VPS) with a production
  MongoDB Atlas database, and the frontend as a static build
  (`npm run build` in `frontend`, deploy the `dist/` folder to e.g.
  Vercel, Netlify, or your own server) pointed at the deployed API URL
  via `VITE_API_URL`
- Use a real `JWT_SECRET` and don't commit `.env` files (already
  gitignored)

## Notes

- Passwords are hashed with bcrypt; auth uses JWTs in an `Authorization:
  Bearer <token>` header
- Customer inquiries require login by design, matching the chosen scope
  (admin-managed catalog + customer accounts, no online checkout)
# Avocado-WEB-Admin
