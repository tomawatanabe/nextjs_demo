import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const getUserImfo = async (req: NextApiRequest, res: NextApiResponse) => {
    .from("users")
    .select("*")
    // .eq("id", parseInt(cookieInt))
    .eq("id", 1)
    .limit(1)
    .single();

  console.log("req.cookies", req.cookies);
  // console.log("Id", parseInt(cookieNumber));

  // 401 Unauthorized、認証が必要
  if (error) res.status(401).json({ error: error.message });

  console.log(error);
  // 200番台は、処理が成功して正常にレスポンスができている状態
  return res.status(200).json(data);
};

export default getUserImfo;
