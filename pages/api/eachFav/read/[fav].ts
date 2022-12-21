import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabase-client";

const readEachFavoriteItems = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { data, error } = await supabase
    .from("favorite_items_duplicate")
    .select()
    .eq("user_id", req.cookies.userID)
    .eq("stock_id", req.query.fav);

  // 401 Unauthorized、認証が必要
  if (error) return res.status(401).json({ error: error.message });

  // 200番台は、処理が成功して正常にレスポンスができている状態
  return res.status(200).json(data);
};

export default readEachFavoriteItems;
