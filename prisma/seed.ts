import { PrismaClient } from '@prisma/client';
import { defaultPortfolioData } from '../src/data/portfolio';

const prisma = new PrismaClient();

async function main() {
  const projects = defaultPortfolioData.projects;

  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    await prisma.project.create({
      data: {
        title: proj.title,
        description: proj.description,
        features: JSON.stringify(proj.features),
        tags: JSON.stringify(proj.tags),
        liveUrl: proj.liveUrl,
        githubUrl: proj.githubUrl || null,
        image: proj.image || null,
        position: i + 1, // 1..N as requested
      },
    });
  }

  console.log(`Backfilled ${projects.length} projects successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
