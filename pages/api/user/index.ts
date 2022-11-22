import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

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

    if (id) {
      const data = {};

      const updateUser = await prisma.user.update({
        where: { id },
        data: {
          fullName,
          totalPoints: {
            increment: points,
          },
        },
      });

      res.status(200).json({ message: "success" });
      return;
    }

    res.status(400).json({ message: "missing data" });
    return;
  }
}
