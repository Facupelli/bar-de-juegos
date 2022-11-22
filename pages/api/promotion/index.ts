import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const promotions = prisma.promotion.findMany({});

    res.status(200).json(promotions);
    return;
  }

  if (req.method === "POST") {
    const {
      name,
      drinksIds,
      gamesIds,
      membershipsIds,
    }: {
      name: string;
      drinksIds: string[];
      gamesIds: string[];
      membershipsIds: string[];
    } = req.body;

    if (name && drinksIds && gamesIds && membershipsIds) {
      const newPromotion = await prisma.promotion.create({
        data: {
          name,
          drinks: { connect: drinksIds.map((id) => ({ id })) },
          games: { connect: gamesIds.map((id) => ({ id })) },
          memberships: { connect: membershipsIds.map((id) => ({ id })) },
        },
      });

      res.status(200).json({ message: "success" });
      return;
    }

    res.status(400).json({ message: "missing data" });
  }
}
