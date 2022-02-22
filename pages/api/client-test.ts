import { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      email: "xxx@gmail.com",
      name: "Ahn",
    },
  });
  res.json({ ok: true });
}
