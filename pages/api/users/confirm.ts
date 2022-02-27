import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true }, // user 객체정보도 포함되는 쿼리
  });
  if (!exists) return res.status(404).end();
  console.log(exists);
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();

  // res.status(200).end();
  res.json({ ok: true });
}

export default withApiSession(withHandler("POST", handler));
