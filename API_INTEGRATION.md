# API & Database Integration Mapping

This document outlines the current state of our database migration (from local static data to Supabase PostgreSQL) and maps out the proposed architecture for fully migrating the rest of the portfolio data.

## 1. Current State (Completed) ✅

We have successfully migrated the **Projects** section to the Supabase PostgreSQL database.

### Prisma Model
```prisma
model Project {
  id          String   @id @default(uuid())
  title       String
  description String
  features    String   // Stored as JSON string
  tags        String   // Stored as JSON string
  liveUrl     String
  githubUrl   String?
  image       String?
  position    Int      @default(0) // Used for drag-and-drop sorting
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### API Endpoints
- `GET /api/projects` - Fetches all projects ordered by `position` ascending.
- `PATCH /api/projects/reorder` - Accepts an array of `{ id, position }` to bulk update project orderings in a single database transaction.

---

## 2. Future Migration Mapping 🚧

To fully replace `src/data/portfolio.ts` and `localStorage`, we need to map the remaining static data structures into relational Prisma models and create corresponding API endpoints.

### A. Hero & Contact Info (Singletons)
Since Hero and Contact data are unique (only one record needed for the portfolio owner), we can combine them into a single `Profile` or `Settings` model.

**Proposed Prisma Model:**
```prisma
model Profile {
  id                        String   @id @default(uuid())
  // Hero Data
  name                      String
  shortName                 String
  roles                     String   // JSON string array
  bio                       String
  resumeFileName            String
  availableForOpportunities Boolean  @default(true)
  
  // Contact Info
  email                     String
  phone                     String
  location                  String
  
  // Social Links
  githubUrl                 String?
  linkedinUrl               String?
  facebookUrl               String?

  updatedAt                 DateTime @updatedAt
}
```
**Proposed Endpoints:**
- `GET /api/profile` - Fetch the profile data.
- `PATCH /api/profile` - Update profile data.

---

### B. About Section (Experience, Education, Stats)
The About section contains nested arrays of data (Stats, Experience, Education). These should be broken down into separate tables with relational mapping to the main profile, or kept as separate independent tables since it's a single-user portfolio.

**Proposed Prisma Models:**
```prisma
model Stat {
  id        String   @id @default(uuid())
  icon      String
  value     String
  label     String
  position  Int      @default(0)
}

model Experience {
  id          String   @id @default(uuid())
  role        String
  company     String
  period      String
  description String
  projects    String   // JSON string array
  position    Int      @default(0)
}

model Education {
  id          String   @id @default(uuid())
  degree      String
  institution String
  period      String
  description String
  position    Int      @default(0)
}
```
**Proposed Endpoints:**
- `GET /api/about` - Fetch all about-related data (Stats, Experience, Education).
- `POST /api/about/experience` - Add new experience.
- `PATCH /api/about/experience/:id` - Update experience.
- *(Similar CRUD endpoints for Education and Stats)*

---

### C. Skills & Categories
Skills belong to categories. This is a perfect one-to-many relationship.

**Proposed Prisma Models:**
```prisma
model SkillCategory {
  id              String   @id @default(uuid())
  title           String
  categoryIconKey String
  position        Int      @default(0)
  skills          Skill[]  // Relation to Skill model
}

model Skill {
  id              String        @id @default(uuid())
  name            String
  iconKey         String
  color           String
  position        Int           @default(0)
  
  categoryId      String
  category        SkillCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
}
```
**Proposed Endpoints:**
- `GET /api/skills` - Fetch all categories with their nested skills (`include: { skills: true }`).
- `POST /api/skills/category` - Create a new category.
- `POST /api/skills` - Add a skill to a specific category.
- `PATCH /api/skills/reorder` - Drag and drop sorting for categories/skills.

---

### D. Services
Services are simple standalone items, similar to Projects.

**Proposed Prisma Model:**
```prisma
model Service {
  id          String   @id @default(uuid())
  iconKey     String
  title       String
  description String
  link        String
  features    String?  // JSON string array
  tags        String?  // JSON string array
  position    Int      @default(0)
}
```
**Proposed Endpoints:**
- `GET /api/services` - Fetch all services.
- `POST /api/services` - Create a new service.
- `PATCH /api/services/:id` - Update a service.
- `PATCH /api/services/reorder` - Drag and drop sorting for services.

---

## 3. Migration Strategy for Remaining Data

When we are ready to execute this mapping:
1. **Update Schema:** Add all the above models to `prisma/schema.prisma`.
2. **Database Migration:** Run `npx prisma db push` (or `migrate dev`) to create the tables in Supabase.
3. **Data Backfill:** Update `prisma/seed.ts` to map the rest of `src/data/portfolio.ts` and insert it into the new tables.
4. **API Routes:** Create the Next.js App Router API routes (`src/app/api/...`) for the new models.
5. **Frontend Updates:** Replace the `loadPortfolioData()` local storage calls in the respective UI components (e.g., `About.tsx`, `Hero.tsx`, `Skills.tsx`) with standard React `fetch` calls to our new APIs. 
6. **Admin Dashboard:** Update the Admin Editor components to perform actual `POST/PATCH/DELETE` requests instead of managing massive local state objects.
