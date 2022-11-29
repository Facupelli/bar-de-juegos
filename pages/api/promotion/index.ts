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
          consumptions: { include: { consumption: true } },
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
    quantity = 1,
  }: {
    id: string;
    name: string;
    consumptionsIds: string[];
    membershipsIds: string[];
    quantity: number;
  } = req.body;

  if (req.method === "POST") {
    try {
      if (name && consumptionsIds && membershipsIds) {
        const newPromotion = await prisma.promotion.create({
          data: {
            name,
            memberships: { connect: membershipsIds.map((id) => ({ id })) },
          },
        });

        await prisma.$transaction(
          consumptionsIds.map((consumptionId) =>
            prisma.consumptionOnPromotion.create({
              data: {
                promotion: { connect: { id: newPromotion.id } },
                consumption: { connect: { id: consumptionId } },
                quantity: Number(quantity),
              },
            })
          )
        );

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
