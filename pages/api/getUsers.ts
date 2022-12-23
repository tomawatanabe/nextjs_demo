import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const loginData: { userID: string; userPW: string } = req.body;
  try {
    const checkData = await supabase
      .from("users")
      .select()
      .eq("email", `${loginData.userID}`)
      .eq("password", `${loginData.userPW}`);

    if (!checkData.data) return;
    const obj = await checkData.data[0];

    if (obj === undefined) {
      res.status(404).json({ massage: "ログイン情報が見つかりません" });
    } else {
      res.status(200).json({
        userID: obj.id,
        userName: obj.last_name + obj.first_name,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json({ massage: "見つかりません" });
  }
};
export default getUsers;
