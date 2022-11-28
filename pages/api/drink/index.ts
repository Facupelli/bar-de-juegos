import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleDrink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const drinks = await prisma.drink.findMany({
        include: { users: { select: { quantity: true } } },
      });

      res.json(drinks);
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }

  const {
    id,
    name,
    points,
  }: {
    id: string;
    name: string;
    points: number;
  } = req.body;

  if (req.method === "POST") {
    try {
      if (name && points) {
        const newGame = await prisma.drink.create({
          data: {
            name,
            points: Number(points),
          },
        });

        res.status(200).json({ message: "success" });
        return;
      }

      res.status(400).json({ message: "missing data" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }

  if (req.method === "PUT") {
    try {
      if (id && (name || points)) {
        const updateDrink = await prisma.drink.update({
          where: { id },
          data: {
            name,
            points: Number(points),
          },
        });

        res.status(200).json({ message: "success" });
        return;
      }
      res.status(400).json({ message: "missing data" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }
}
