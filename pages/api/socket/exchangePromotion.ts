import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../src/types/next";

const exchangePromotion = (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  if (req.method === "POST") {
    // get message

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("exchangePromotion");

    // return message
    res.status(201).json({ message: "success" });
  }
};

export default exchangePromotion;
