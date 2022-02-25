import { NextApiRequest, NextApiResponse } from "next";

const withHandler = (
  method: "POST" | "GET" | "DELETE" | "PUT",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(405).end(); // return 있고 없고 차이 없을 듯
    }

    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error }); // return 있고 없고 차이 없을 듯
    }
  };
};

export default withHandler;
