import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleGame(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const games = await prisma.game.findMany({});

    res.json(games);
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
      const newGame = await prisma.game.create({
        data: {
          name,
          points,
        },
      });

      res.status(200).json({ message: "succes" });
      return;
    }
    res.status(400).json({ message: "missing data" });
  }
}
