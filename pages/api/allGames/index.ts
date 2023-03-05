import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handleConsumption(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "GET") {
      try {
        const allGames = await prisma.consumption.findMany({
          where: { consumptionCategoryId: "cleubcq1e0005e788cizbtne3" },
        });

        return res.status(200).json(allGames);
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: `error ${e}` });
      }
    }
  } else {
    // Not Signed in
    res.status(401).json({ message: "unauthorized" });
  }
  res.end();
}
