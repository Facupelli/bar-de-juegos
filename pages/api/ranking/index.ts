import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { UsersRanking } from "../../../src/types/ranking";

export default async function handlerPromotion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const playersGameConsumptions = await prisma.consumption.findMany({
        where: { id: "clc82cbe10000e7zos4is242w" },
        include: {
          users: {
            where: {
              winner: true,
            },
            select: {
              id: true,
              winner: true,
              quantity: true,
              user: {
                select: {
                  id: true,
                  fullName: true,
                },
              },
            },
          },
        },
      });

      const groupBy = (users: UsersRanking[]) => {
        return users.reduce((prev, next) => {
          if (next.user.id in prev) {
            prev[next.user.id].quantity += next.quantity;
          } else {
            prev[next.user.id] = next;
          }
          return prev;
        }, Object.create({}));
      };

      type Ranking = {
        id: {
          id: string;
          winner: boolean;
          quantity: number;
          user: {
            id: string;
            fullName: string;
          };
        };
      };

      const ranking: Ranking[] = groupBy(playersGameConsumptions[0].users);
      const result: UsersRanking[] = Object.keys(ranking).map(
        (id) => ranking[id]
      );

      // const users = await prisma.consumptionOnUser.groupBy({
      //   by: ["userId", "consumptionId", "userId"],
      //   where: {
      //     consumption: {
      //       type: "GAME",
      //     },
      //   },
      //   _sum: {
      //     quantity: true,
      //   },
      // });

      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: `error ${e}` });
    }
  }
}
