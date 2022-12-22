import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

type PutBody = {
  userId: string;
  operation: string;
  consumptionId: string;
  points: number;
  consumptionType: string;
  quantity: number;
  promotionId: string;
};

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
          membership: {
            include: {
              promotions: {
                include: {
                  consumptions: { include: { consumption: true } },
                  memberships: true,
                },
              },
            },
          },
          consumptions: {
            include: { consumption: true },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (user) {
        return res.status(200).json(user);
      }

      return res.status(404).json({ message: "User not found" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: `error ${e}` });
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
      }: PutBody = req.body;

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
          include: { membership: true },
        });

        if (
          user.membership &&
          user.totalPointsSpent > user.membership?.maxPoints
        ) {
          const membership = await prisma.membership.findFirst({
            where: {
              AND: [
                { minPoints: { lte: user.totalPointsSpent } },
                { maxPoints: { gt: user.totalPointsSpent } },
              ],
            },
          });

          if (membership) {
            await prisma.user.update({
              where: { id: userId },
              data: {
                membership: { connect: { id: membership.id } },
              },
            });
          }
        }

        return res.status(200).json({ message: "success" });
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

        return res.status(200).json({ message: "success" });
      }

      return res.status(400).json({ message: "missing operation" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: `error ${e}` });
    }
  }
}
