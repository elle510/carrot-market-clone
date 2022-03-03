import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // 비슷한 상품 검색
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  // 좋아요
  const isLiked = Boolean(
    await client.fav.findFirst({
      where: {
        productId: +id.toString(),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    ok: true,
    product,
    relatedProducts,
    isLiked,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);