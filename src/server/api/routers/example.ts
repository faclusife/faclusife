import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: publicProcedure.query(async () => {
    const respone = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json() as Promise<{ joke: string }>)
      .catch((err) => {
        console.error(err);
      });
    if (respone) {
      return respone.joke.replace(/\?/g, "?\n");
    }
    return "No joke for you";
  }),
});
