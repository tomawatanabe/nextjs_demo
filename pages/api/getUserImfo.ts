import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const getUserImfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookieNumber = Number(req.cookies.userID);
  // const cookieInt = parseInt(req.cookies.userID, 10);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", cookieNumber)
    .limit(1)
    .single();

  console.log(cookieNumber);

  // 401 Unauthorized、認証が必要
  if (error) res.status(401).json({ error: error.message });

  console.log(error);
  // 200番台は、処理が成功して正常にレスポンスができている状態
  return res.status(200).json(data);
};

export default getUserImfo;
