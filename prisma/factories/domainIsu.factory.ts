import prisma from "@/lib/prisma";
import { config } from "@/config";

const domainIsuFactory = async () => {
  await prisma.domainIsu.deleteMany();

  return Promise.all(
    config.prisma.domainIsu.map((d) =>
      prisma.domainIsu.upsert({
        where: { code: d.code },
        update: {},
        create: d,
      }),
    ),
  );
};

export { domainIsuFactory };
