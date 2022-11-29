import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as string;

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          membership: { include: { promotions: true } },
          consumptions: {
            include: { consumption: true },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const {
        userId,
        consumptionId,
        operation,
        points,
        consumptionType,
        quantity,
        promotionId,
      }: {
        userId: string;
        operation: string;
        consumptionId: string;
        points: number;
        consumptionType: string;
        quantity: number;
        promotionId: string;
      } = req.body;

      if (promotionId) {
        const promotionOnUser = await prisma.promotionOnUser.create({
          data: {
            promotionId,
            userId,
            quantity: Number(quantity),
          },
        });

        const user = await prisma.user.update({
          where: { id: userId },
          data: {
            totalPoints: {
              decrement: Number(points),
            },
            totalPointsSpent: {
              increment: Number(points),
            },
          },
        });

        res.status(200).json({ message: "success" });
        return;
      }

      if (operation === "addPoints") {
        const consumptionOnUser = await prisma.consumptionOnUser.create({
          data: {
            user: { connect: { id: userId } },
            consumption: { connect: { id: consumptionId } },
            quantity: Number(quantity),
          },
        });

        const user = await prisma.user.update({
          where: { id: userId },
          data: {
            totalPoints: {
              increment: Number(points),
            },
          },
        });

        res.status(200).json({ message: "success" });
        return;
      }

      res.status(400).json({ message: "missing operation" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }
}
