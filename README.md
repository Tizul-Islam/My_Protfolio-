# 🚀 Developer Portfolio & Admin Dashboard

A modern, dynamic, and fully responsive **Full-Stack Developer Portfolio** built with **Next.js 16 (App Router)**. This project is designed to showcase skills, projects, and experiences with a built-in, secure **Admin Panel** that allows seamless content management (CRUD operations) without touching the code.

---

## 🛠️ Tech Stack & Technologies

### Frontend
- **Framework:** Next.js (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Drag & Drop:** dnd-kit (for reordering projects)
- **Icons:** React Icons

### Backend & Database
- **API:** Next.js Route Handlers (RESTful APIs)
- **ORM:** Prisma Client
- **Database:** PostgreSQL (hosted on Supabase)
- **Deployment:** Vercel & Prisma Compute

---

## ✨ Key Features

### 🎨 1. Dynamic User Interface (Client Side)
- **Beautiful & Modern UI:** Crafted with Tailwind CSS, featuring glassmorphism, dark themes, and glowing effects.
- **Smooth Animations:** Powered by Framer Motion for page transitions and micro-interactions.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
- **Dynamic Content:** All projects and portfolio data are fetched directly from the PostgreSQL database in real-time.

### 🔐 2. Powerful Admin Panel (Server Side)
- **Project Management (CRUD):** Add, Edit, Delete, and Read projects directly from the `/admin/dashboard`.
- **Drag & Drop Reordering:** Easily change the display order of projects using a drag-and-drop interface (`@dnd-kit`).
- **Advanced Image Handling:** Support for multiple image sources:
  - 📤 **Upload from PC** (Base64 conversion)
  - ☁️ **Cloud URL** (Cloudinary, Supabase, Firebase)
  - 📁 **Local Path**
  - 🖼️ **Existing Images** (Select from previously uploaded images)
- **Dynamic Features & Tags:** Add interactive tags and key features on the fly.

### ⚙️ 3. Robust Backend Architecture
- **API Routes:** Dedicated Next.js API endpoints (`/api/projects`, `/api/projects/[id]`, `/api/projects/reorder`) to handle all database transactions securely.
- **Prisma ORM:** Type-safe database queries and schema management.
- **PostgreSQL:** Reliable and scalable relational database setup via Supabase.

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Tizul-Islam/My_Protfolio-.git
cd My_Protfolio-
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your database credentials:
```env
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://[USER]:[PASSWORD]@[HOST]:5432/postgres"
```

### 4. Setup Prisma Database
Generate Prisma client and push the schema to your database:
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The Admin Panel can be accessed at `/admin/dashboard`.

---

## 👨‍💻 About the Developer
Built by a passionate **Full-Stack Web Developer** focusing on scalable architectures, interactive user experiences, and clean code principles. Open to collaborations and new opportunities!

---
*If you like this project, feel free to give it a ⭐ on GitHub!*
