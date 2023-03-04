import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ConsumptionCategory } from "../../../src/types/model";

export default async function handleConsumption(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "GET") {
      const userId = req.query.userId as string;
      const ranking = req.query.ranking as string;

      if (userId) {
        try {
          const allConsumptions = await prisma.consumptionCategory.findMany({
            include: {
              consumptions: true,
            },
          });

          return res.json(allConsumptions);
        } catch (e) {
          console.error(e);
          res.status(500).json({ message: `error ${e}` });
        }
      }

      // if (ranking) {
      //   try {
      //     const consumptions = await prisma.consumption.findMany({
      //       include: { _count: { select: { users: true } } },
      //       where: { type: "DRINK" },
      //       orderBy: {
      //         users: {
      //           _count: "desc",
      //         },
      //       },
      //     });

      //     return res.json({ consumptions });
      //   } catch (e) {
      //     console.error(e);
      //     res.status(500).json({ message: `error ${e}` });
      //   }
      // }

      try {
        const allConsumptions = await prisma.consumptionCategory.findMany({
          include: {
            consumptions: true,
          },
        });

        return res.status(200).json(allConsumptions);
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: `error ${e}` });
      }
    }

    const {
      id,
      categoryId,
      name,
      points,
    }: {
      id: string;
      categoryId: string;
      name: string;
      points: number;
    } = req.body;

    if (req.method === "POST") {
      try {
        if (name && points) {
          const newConsumption = await prisma.consumption.create({
            data: {
              name,
              points: Number(points),
              consumptionCategoryId: categoryId,
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

    if (req.method === "PUT") {
      try {
        if (id && (name || points)) {
          const updateDrink = await prisma.consumption.update({
            where: { id },
            data: {
              name,
              points: Number(points),
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
        const { consumptionId }: { consumptionId: string } = req.body;

        if (consumptionId) {
          const deleteConsumption = await prisma.consumption.delete({
            where: { id: consumptionId },
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
