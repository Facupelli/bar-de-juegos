import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIO } from "../../../src/types/next";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const { consumptionType }: { consumptionType: string } = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("addConsumption", { consumptionType });

    // return message
    res.status(201).json({ message: "success" });
  }
};
