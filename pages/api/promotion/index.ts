import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handlerPromotion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
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
          res.status(500).json({ message: `error ${e}` });
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
        res.status(500).json({ message: `error ${e}` });
      }
    }

    const {
      id,
      name,
      consumptionsIds,
      membershipsIds,
      quantity = 1,
      discount,
      points,
    }: {
      id: string;
      name: string;
      consumptionsIds: string[];
      membershipsIds: string[];
      quantity: number;
      discount: number;
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
              discount: Number(discount),
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
        res.status(500).json({ message: `error ${e}` });
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
        res.status(500).json({ message: `error ${e}` });
      }
    }

    if (req.method === "DELETE") {
      try {
        const { promotionId }: { promotionId: string } = req.body;

        if (promotionId) {
          const deletePromotion = await prisma.promotion.delete({
            where: { id: promotionId },
          });

          return res.status(200).json({ message: "success" });
        }

        return res.status(400).json({ message: "missing id" });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: `error ${e}` });
      }
    }
  } else {
    // Not Signed in
    res.status(401).json({ message: "unauthorized" });
  }
}
