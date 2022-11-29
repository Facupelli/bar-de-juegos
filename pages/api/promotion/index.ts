import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerPromotion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const promotions = await prisma.promotion.findMany({
        include: {
          consumptions: true,
          memberships: true,
        },
      });

      res.status(200).json(promotions);
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }

  const {
    id,
    name,
    consumptionsIds,
    membershipsIds,
  }: {
    id: string;
    name: string;
    consumptionsIds: string[];
    membershipsIds: string[];
  } = req.body;

  if (req.method === "POST") {
    try {
      if (name && consumptionsIds && membershipsIds) {
        const newPromotion = await prisma.promotion.create({
          data: {
            name,
            consumptions: { connect: consumptionsIds.map((id) => ({ id })) },
            memberships: { connect: membershipsIds.map((id) => ({ id })) },
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
      if (id && name && consumptionsIds && membershipsIds) {
        const updatePromotion = await prisma.promotion.update({
          where: { id },
          data: {
            name,
            consumptions: { connect: consumptionsIds.map((id) => ({ id })) },
            memberships: { connect: membershipsIds.map((id) => ({ id })) },
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
