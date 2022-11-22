import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleDrink(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const drinks = await prisma.drink.findMany({});

    res.json(drinks);
    return;
  }

  if (req.method === "POST") {
    const {
      name,
      points,
    }: {
      name: string;
      points: number;
    } = req.body;

    if (name && points) {
      const newGame = await prisma.drink.create({
        data: {
          name,
          points,
        },
      });

      res.status(200).json({ message: "success" });
      return;
    }

    res.status(400).json({ message: "missing data" });
  }
}
