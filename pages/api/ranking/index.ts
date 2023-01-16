import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { UsersRanking } from "../../../src/types/ranking";

export default async function handlerPromotion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const gameId = req.query.gameId as string;

    try {
      if (gameId) {
        const playersGameConsumptions = await prisma.consumption.findMany({
          where: { id: gameId },
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
          return users?.reduce((prev, next) => {
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

        return res.status(200).json(result);
      }

      return res.status(400).json({ message: "missing data" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: `error ${e}` });
    }
  }
}
