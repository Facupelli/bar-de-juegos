import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ConsumptionType } from "../../../src/types/model";

export default async function handleConsumption(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const userId = req.query.userId as string;
    if (userId) {
      try {
        const drinkConsumptions = await prisma.consumption.findMany({
          include: { users: { where: { userId: userId } } },
          where: { type: "DRINK" },
        });

        const gameConsumptions = await prisma.consumption.findMany({
          include: { users: { where: { userId: userId } } },
          where: { type: "GAME" },
        });

        return res.json({ drinks: drinkConsumptions, games: gameConsumptions });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "error" });
      }
    }

    try {
      const drinkConsumptions = await prisma.consumption.findMany({
        where: { type: "DRINK" },
        include: { users: true },
      });

      const gamesConsumptions = await prisma.consumption.findMany({
        where: { type: "GAME" },
        include: { users: true },
      });

      return res.json({ drinks: drinkConsumptions, games: gamesConsumptions });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }

  const {
    id,
    type,
    name,
    points,
  }: {
    id: string;
    type: typeof ConsumptionType[keyof typeof ConsumptionType];
    name: string;
    points: number;
  } = req.body;

  if (req.method === "POST") {
    try {
      if (name && points) {
        const newConsumption = await prisma.consumption.create({
          data: {
            name,
            points: Number(points),
            type,
          },
        });

        return res.status(200).json({ message: "success" });
      }

      return res.status(400).json({ message: "missing data" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }

  if (req.method === "PUT") {
    try {
      if (id && (name || points)) {
        const updateDrink = await prisma.consumption.update({
          where: { id },
          data: {
            name,
            points: Number(points),
          },
        });

        return res.status(200).json({ message: "success" });
      }

      return res.status(400).json({ message: "missing data" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }
}
