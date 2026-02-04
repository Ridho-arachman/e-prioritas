import "dotenv/config";
export const config = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || "E-Prioritas",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  prisma: {
    user: {
      userId: "ZAZW2VDe753WUUcZYxipARmXzq5qW9EX",
    },
  },
};
