import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;

  // // user 없으면 생성하고 있으면 리턴
  // const payload = phone ? { phone } : { email };
  // const user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: "Anonymous",
  //     ...payload,
  //   },
  //   update: {},
  // });
  // console.log(user);

  // // token 생성하고 user 와 연결시켜 준다.
  // const token = await client.token.create({
  //   data: {
  //     payload: Math.floor(10000 + Math.random() * 900000) + "",
  //     user: {
  //       connect: {
  //         id: user.id,
  //       },
  //     },
  //   },
  // });

  // 위의 코드를 다르게 코딩하면
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(10000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  res.json({ ok: true });
}

export default withHandler({ method: "POST", handler, isPrivate: false });
