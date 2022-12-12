import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerMembership(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const memberships = await prisma.membership.findMany({
        orderBy: { minPoints: "asc" },
      });

      res.status(200).json(memberships);
      return;
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }

  const {
    id,
    name,
    minPoints,
    maxPoints,
    promotionsIds,
  }: {
    id: string;
    name: string;
    minPoints: number;
    maxPoints: number;
    promotionsIds: string[];
  } = req.body;

  if (req.method === "POST") {
    try {
      if (name || promotionsIds) {
        const newMembership = await prisma.membership.create({
          data: {
            name,
            minPoints: Number(minPoints),
            maxPoints: Number(maxPoints),
            // promotions: { connect: promotionsIds.map((id) => ({ id })) },
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
      if (id && (name || promotionsIds)) {
        const updateMembership = await prisma.membership.update({
          where: { id },
          data: {
            name,
            promotions: { connect: promotionsIds.map((id) => ({ id })) },
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

  if (req.method === "DELETE") {
    try {
      const { membershipId }: { membershipId: string } = req.body;

      if (membershipId) {
        const deleteMembership = await prisma.membership.delete({
          where: { id: membershipId },
        });

        return res.status(200).json({ message: "success" });
      }

      return res.status(400).json({ message: "missing id" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: `e: ${e}` });
    }
  }
}
