// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loginData: { userId: string; userPw: string } = req.body;

  try {
    const checkData = await fetch(
      `${process.env.API_BASE_URL}/api/users?email=${loginData.userId}&password=${loginData.userPw}`
    );

    const obj = await checkData.json();

    if (obj[0] === undefined) {
      res.status(404).json({ massage: "ログイン情報が見つかりません" });
    } else {
      res.status(200).json({
        cookieId: obj[0].id,
        userName: obj[0].lastName + obj[0].firstName,
      });
    }
  } catch (error) {
    return res.status(404).json({ massage: "見つかりません" });
  }
}
