import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerMembership(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const memberships = await prisma.membership.findMany({});

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
    promotionsIds,
  }: {
    id: string;
    name: string;
    minPoints: number;
    promotionsIds: string[];
  } = req.body;

  if (req.method === "POST") {
    try {
      if (name || promotionsIds) {
        const newMembership = await prisma.membership.create({
          data: {
            name,
            minPoints: Number(minPoints),
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
}
