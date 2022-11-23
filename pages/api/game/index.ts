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
    if (name && points) {
      const newGame = await prisma.game.create({
        data: {
          name,
          points: Number(points),
        },
      });

      res.status(200).json({ message: "succes" });
      return;
    }
    res.status(400).json({ message: "missing data" });
  }

  if (req.method === "PUT") {
    if (id && (name || points)) {
      const updateGame = await prisma.game.update({
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
  }
}
