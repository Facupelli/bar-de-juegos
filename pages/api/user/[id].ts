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
          games: { include: { game: true } },
          drinks: { include: { drink: true } },
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
      }: {
        userId: string;
        operation: string;
        consumptionId: string;
        points: number;
        consumptionType: string;
        quantity: number;
      } = req.body;

      if (operation === "addPoints") {
        if (consumptionType === "drink") {
          const drinkOnUser = await prisma.drinksOnUser.findUnique({
            where: {
              userId_drinkId: { userId, drinkId: consumptionId },
            },
          });

          if (drinkOnUser) {
            await prisma.drinksOnUser.update({
              where: {
                userId_drinkId: { userId, drinkId: consumptionId },
              },
              data: {
                quantity: { increment: Number(quantity) },
              },
            });
          } else {
            const drinkOnUser = await prisma.drinksOnUser.create({
              data: {
                user: { connect: { id: userId } },
                drink: { connect: { id: consumptionId } },
                quantity: Number(quantity),
              },
            });
          }
        }

        if (consumptionType === "game") {
          const gameOnUser = await prisma.gamesOnUser.findUnique({
            where: {
              userId_gameId: { userId, gameId: consumptionId },
            },
          });

          if (gameOnUser) {
            await prisma.gamesOnUser.update({
              where: {
                userId_gameId: { userId, gameId: consumptionId },
              },
              data: {
                quantity: { increment: Number(quantity) },
              },
            });
          } else {
            const gamesOnUser = await prisma.gamesOnUser.create({
              data: {
                user: { connect: { id: userId } },
                game: { connect: { id: consumptionId } },
                quantity: Number(quantity),
              },
            });
          }
        }

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
