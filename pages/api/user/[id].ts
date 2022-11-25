import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handlerUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as string;

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          membership: { include: { promotions: true } },
          games: true,
          drinks: true,
        },
      });

      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "error" });
    }
  }
}
