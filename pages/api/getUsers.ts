import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const loginData: { userID: string; userPW: string } = req.body;
  // try {
  const checkData = await supabase
    .from("users")
    .select()
    .eq("email", `${loginData.userID}`)
    .eq("password", `${loginData.userPW}`);

  //   const obj = await checkData;

  //   if (obj[0] === undefined) {
  //     res.status(404).json({ massage: "ログイン情報が見つかりません" });
  //   } else {
  //     res.status(200).json({
  //       userID: obj[0].id,
  //       userName: obj[0].lastName + obj[0].firstName,
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(404).json({ massage: "見つかりません" });
  // }
  return checkData;
};
export default getUsers;
