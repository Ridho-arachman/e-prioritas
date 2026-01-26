import "dotenv/config";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { config } from "@/config";

const main = async () => {
  const email = "ridho.arachman56@gmail.com";
  const name = "Admin Panggungjati";
  const password = "Admin!23";
  const role = "ADMIN";
  const jabatan = "Operator Sistem Kelurahan Panggungjati";
  const phoneNumber = "0819111487893";

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    await prisma.user.delete({
      where: {
        email,
      },
    });
    console.log("Existing user deleted:", email);
  }

  const user = await auth.api.signUpEmail({
    body: {
      email,
      name,
      password,
      role,
      jabatan,
      phoneNumber,
      callbackURL: `${config.appUrl}/verify-success`,
    },
  });

  console.log("User created:", user.user.name, " 🎉🎉🎉🎉");
};

main().catch((error) => {
  console.error("Error creating admin user:", error);
});
