import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import { secondaryStorage } from "./storage";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secondaryStorage,
  plugins: [nextCookies()],
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          if (user.email !== "keanuharrell@gmail.com") {
            throw new Error("Unauthorized access");
          }
          return { data: user };
        },
      },
    },
  },
});
