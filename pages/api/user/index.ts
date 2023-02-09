import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "GET") {
      try {
        const userRanking = req.query.userRanking as string;
        const skip = req.query.skip as string;

        if (userRanking) {
          const users = await prisma.user.findMany({
            orderBy: {
              totalPointsSpent: "desc",
            },
            take: 10,
          });

          return res.status(200).json(users);
        }

        if (skip) {
          const users = await prisma.user.findMany({
            take: 20,
            skip: Number(skip),
          });

          return res.status(200).json(users);
        }

        return res.status(400).json({ message: "missing query" });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: `error ${e}` });
      }
    }

    if (req.method === "POST") {
      try {
        const {
          membershipId,
          fullName,
        }: { fullName: string; membershipId: string } = req.body;

        if (membershipId) {
          const newUser = await prisma.user.create({
            data: {
              membershipId,
              fullName,
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
        res.status(500).json({ message: `error ${e}` });
      }
    }
  } else {
    // Not Signed in
    res.status(401).json({ message: "unauthorized" });
  }
}
