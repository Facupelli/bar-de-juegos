import { prisma } from "../../../db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handleConsumption(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, name }: { email: string; name: string } = req.body;

    try {
      const user = await prisma.userLoggedInfo.findUnique({
        where: { email },
        include: { user: true },
      });

      if (user) {
        return res.status(200).json({
          message: "success",
          role: user.user.role,
        });
      }

      return res.status(400).json({ message: "User Not Found" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: `error ${e}` });
    }
  }
}
