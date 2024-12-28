import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";

export const MoviesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.movie.findMany();
  }),
  getAllWatched: publicProcedure.query(async () => {
    return await prisma.movie.findMany({
      where: {
        status: "WATCHED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getAllToWatch: publicProcedure.query(async () => {
    return await prisma.movie.findMany({
      where: {
        status: "TO_WATCH",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  createNew: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        year: z.number(),
        imageUrl: z.string(),
        bohdan: z.number(),
        mykola: z.number(),
        status: z.enum(["TO_WATCH", "WATCHED"]),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.movie.create({
        data: {
          ...input,
          updatedAt: new Date(),
        },
      });
    }),

  setToWatched: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        bohdan: z.number(),
        mykola: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.movie.update({
        where: {
          id: input.id,
        },
        data: {
          status: "WATCHED",
          bohdan: input.bohdan,
          mykola: input.mykola,
        },
      });
    }),
});
