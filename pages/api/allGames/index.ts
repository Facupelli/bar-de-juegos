import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ConsumptionType } from "../../../src/types/model";

export default async function handleConsumption(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const allGames = await prisma.consumption.findMany({
        where: { type: "GAME" },
      });

      return res.status(200).json(allGames);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: `error ${e}` });
    }
  }
}
