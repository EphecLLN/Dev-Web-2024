import prisma from "../src/lib/prisma";

async function main() {
  const simon = await prisma.user.upsert({
    where: { email: "simon.fontaine@example.com" },
    update: {},
    create: {
      email: "simon.fontaine@example.com",
      username: "hestia",
      avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
    },
  });

  const timothy = await prisma.user.upsert({
    where: { email: "timothy.truong@example.com" },
    update: {},
    create: {
      email: "timothy.truong@example.com",
      username: "bistouflere",
      avatarUrl: "https://cdn.discordapp.com/embed/avatars/1.png",
    },
  });

  const bastien = await prisma.user.upsert({
    where: { email: "bastien.patureau@example.com" },
    update: {},
    create: {
      email: "bastien.patureau@example.com",
      username: "echo",
      avatarUrl: "https://cdn.discordapp.com/embed/avatars/2.png",
    },
  });

  const guillaume = await prisma.user.upsert({
    where: { email: "guillaume.ladriere@example.com" },
    update: {},
    create: {
      email: "guillaume.ladriere@example.com",
      username: "guignome",
      avatarUrl: "https://cdn.discordapp.com/embed/avatars/3.png",
    },
  });

  const maxime = await prisma.user.upsert({
    where: { email: "maxime.bongartz@example.com" },
    update: {},
    create: {
      email: "maxime.bongartz@example.com",
      username: "max",
      avatarUrl: "https://cdn.discordapp.com/embed/avatars/4.png",
    },
  });

  const teamOne = await prisma.team.upsert({
    where: { name: "Team One" },
    update: {},
    create: {
      name: "Team One",
      users: {
        connect: [
          { id: simon.id },
          { id: timothy.id },
          { id: bastien.id },
          { id: guillaume.id },
        ],
      },
      owner: { connect: { id: simon.id } },
    },
  });

  const teamTwo = await prisma.team.upsert({
    where: { name: "Team Two" },
    update: {},
    create: {
      name: "Team Two",
      users: {
        connect: [{ id: simon.id }, { id: timothy.id }],
      },
      owner: { connect: { id: timothy.id } },
    },
  });

  const teamThree = await prisma.team.upsert({
    where: { name: "Team Three" },
    update: {},
    create: {
      name: "Team Three",
      users: {
        connect: [{ id: bastien.id }, { id: guillaume.id }],
      },
      owner: { connect: { id: bastien.id } },
    },
  });

  console.log({
    simon,
    timothy,
    bastien,
    guillaume,
    maxime,
    teamOne,
    teamTwo,
    teamThree,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
