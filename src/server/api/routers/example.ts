import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";

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
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json() as Promise<{ joke: string }>)
      .catch((err) => {
        console.error(err);
      });
    if (response) {
      return response.joke.split("?");
    }
    return null;
  }),

  getDartsStats: publicProcedure.query(async () => {
    return await prisma.darts.findMany();
  }),

  createDartsRecord: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        score: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.darts.create({
        data: {
          name: input.name,
          score: input.score,
          updatedAt: new Date(),
        },
      });
    }),
  updateDartsRecord: protectedProcedure
    .input(
      z.object({
        id: z.string().length(25),
        data: z.object({
          name: z.string(),
          score: z.number(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.darts.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.data.name,
          score: input.data.score,
          updatedAt: new Date(),
        },
      });
    }),
  deleteDartsRecord: protectedProcedure
    .input(z.string().length(25))
    .mutation(async ({ input }) => {
      return await prisma.darts.delete({
        where: {
          id: input,
        },
      });
    }),
});
