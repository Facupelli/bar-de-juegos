import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const userRanking = req.query.userRanking as string;

      if (userRanking) {
        const users = await prisma.user.findMany({
          orderBy: {
            totalPointsSpent: "desc",
          },
        });

        return res.status(200).json(users);
      }

      return res.status(400).json({ message: "missing query" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { id, membershipId }: { id: string; membershipId: string } =
        req.body;

      if (id && membershipId) {
        const newUser = await prisma.user.create({
          data: {
            id,
            membershipId,
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

  if (req.method === "PUT") {
    try {
      const {
        id,
        fullName,
        points,
      }: { id: string; fullName: string; points: number } = req.body;

      type data = {
        fullName: string;
        totalPoints: { increment: number };
      };

      const data: data = {
        fullName: "",
        totalPoints: {
          increment: 0,
        },
      };

      if (fullName) data.fullName = fullName;
      if (points) data.totalPoints.increment = points;

      if (id) {
        const updateUser = await prisma.user.update({
          where: { id },
          data,
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
