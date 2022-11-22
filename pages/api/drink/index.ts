import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

type Data = {
  message: string;
};

export default async function handleDrink(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
