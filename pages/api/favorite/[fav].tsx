import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase-client";

const favoriteHundler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const { data: getData, error: getError } = await supabase
        .from("favorite_items")
        .select()
        .eq("user_id", req.cookies.userID)
        .eq("stock_id", req.query.fav);
      // 401 Unauthorized、認証が必要
      if (getError) return res.status(401).json({ error: getError.message });
      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(getData);

    case "POST":
      const { data: postData, error: postError } = await supabase
        .from("favorite_items")
        .insert([
          {
            user_id: req.cookies.userID,
            stock_id: req.query.fav,
          },
        ]);

      // 401 Unauthorized、認証が必要
      if (postError) return res.status(401).json({ error: postError.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(postData);

    case "DELETE":
      const { data: deleteData, error: deleteError } = await supabase
        .from("favorite_items")
        .delete()
        .eq("user_id", req.cookies.userID)
        .eq("stock_id", req.query.fav);

      // 401 Unauthorized、認証が必要
      if (deleteError)
        return res.status(401).json({ error: deleteError.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(deleteData);

    default:
      break;
  }
};

export default favoriteHundler;
