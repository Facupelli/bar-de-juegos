import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../src/types/next";
import { GameOver } from "../../../src/types/socketio";

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const { id }: { id: string } = req.body;
    console.log("ID ID ID ID ID ID ------>>", id);
    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("gameOver", { id });

    // return message
    res.status(201).json({ message: "success" });
  }
};
