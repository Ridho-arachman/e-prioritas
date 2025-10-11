import { createMasukanWargaSchema } from "@/schema/masukanWarga";
import { createUserSchema } from "@/schema/sign-up";
import { createDocument } from "zod-openapi";

export const openApiDocument = createDocument({
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
  },
  paths: {
    "/api/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: createUserSchema.meta({
                title: "RegisterRequest",
              }),
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: createUserSchema.meta({ description: "User data" }),
                status: 201,
              },
            },
          },
        },
      },
    },
  },
});
