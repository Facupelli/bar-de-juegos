import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";
import { ConsumptionType } from "../../../src/types/model";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handleConsumption(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "PUT") {
      const { id, status }: { id: string; status: boolean } = req.body;

      try {
        if (id && (status === true || status === false)) {
          const updateConsumption = await prisma.consumptionOnUser.update({
            where: { id },
            data: {
              winner: status,
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
  } else {
    // Not Signed in
    res.status(401).json({ message: "unauthorized" });
  }
}
