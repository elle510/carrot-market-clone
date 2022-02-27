import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: "POST" | "GET" | "DELETE" | "PUT";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

const withHandler = ({ method, handler, isPrivate = true }: ConfigType) => {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    // Method 체크
    if (req.method !== method) {
      return res.status(405).end(); // return 있고 없고 차이 없을 듯
    }
    // 로그인 체크(브라우저 쿠키 체크)
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error }); // return 있고 없고 차이 없을 듯
    }
  };
};

export default withHandler;
