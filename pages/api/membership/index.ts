import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerMembership(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const memberships = await prisma.membership.findMany({});

    res.status(200).json(memberships);
    return;
  }

  const {
    id,
    name,
    promotionsIds,
  }: {
    id: string;
    name: string;
    promotionsIds: string[];
  } = req.body;

  if (req.method === "POST") {
    if (name || promotionsIds) {
      const newMembership = await prisma.membership.create({
        data: {
          name,
          // promotions: { connect: promotionsIds.map((id) => ({ id })) },
        },
      });

      res.status(200).json({ message: "success" });
      return;
    }

    res.status(400).json({ message: "missing data" });
  }

  if (req.method === "PUT") {
    if (id && (name || promotionsIds)) {
      const updateMembership = await prisma.membership.update({
        where: { id },
        data: {
          name,
          promotions: { connect: promotionsIds.map((id) => ({ id })) },
        },
      });
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(400).json({ message: "missing data" });
  }
}
