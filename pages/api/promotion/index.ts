import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerPromotion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const ranking = req.query.ranking as string;

    if (ranking) {
      try {
        const promotions = await prisma.promotion.findMany({
          include: {
            users: true,
          },
        });

        return res.status(200).json(promotions);
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: "error" });
      }
    }

    try {
      const promotions = await prisma.promotion.findMany({
        include: {
          consumptions: { include: { consumption: true } },
          memberships: true,
        },
      });

      return res.status(200).json(promotions);
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
    points,
  }: {
    id: string;
    name: string;
    consumptionsIds: string[];
    membershipsIds: string[];
    quantity: number;
    points: number;
  } = req.body;

  if (req.method === "POST") {
    try {
      if (name && consumptionsIds && membershipsIds && points) {
        const newPromotion = await prisma.promotion.create({
          data: {
            name,
            memberships: { connect: membershipsIds.map((id) => ({ id })) },
            points: Number(points),
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

        return res.status(200).json({ message: "success" });
      }

      return res.status(400).json({ message: "missing data" });
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
        return res.status(200).json({ message: "success" });
      }
      return res.status(400).json({ message: "missing data" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }
}
