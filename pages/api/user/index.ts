import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { id, membershipId }: { id: string; membershipId: string } = req.body;

    if (id && membershipId) {
      const newUser = await prisma.user.create({
        data: {
          id,
          membershipId,
        },
      });

      res.status(200).json({ message: "success" });
      return;
    }

    res.status(400).json({ message: "missing data" });
    return;
  }

  if (req.method === "PUT") {
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

      res.status(200).json({ message: "success" });
      return;
    }

    res.status(400).json({ message: "missing data" });
    return;
  }
}
