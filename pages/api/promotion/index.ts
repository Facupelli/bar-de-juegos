import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

type Data = {
  message: string;
};

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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

    const newPromotion = await prisma.promotion.create({
      data: {
        name,
        drinks: { connect: drinksIds.map((id) => ({ id })) },
        games: { connect: gamesIds.map((id) => ({ id })) },
        memberships: { connect: membershipsIds.map((id) => ({ id })) },
      },
    });
  }
}
