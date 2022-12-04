import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../src/types/next";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("exchangePromotion");

    // return message
    res.status(201).json({ message: "success" });
  }
};
