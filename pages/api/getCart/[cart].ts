import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase-client";

const getCart = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const { data: getData, error: getError } = await supabase
        .from("shopping_cart")
        .select(`*,stocks(*,items(*))`)
        .eq("user_id", req.cookies.userID);

      // 401 Unauthorized、認証が必要
      // { error: getError.message }
      if (getError) return res.status(401).json([{ error: getError.message }]);
      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(getData);

    case "POST":
      const { data: postData, error: postError } = await supabase
        .from("shopping_cart")
        .insert([
          {
            user_id: req.cookies.userID,
            stock_id: req.query.cart,
          },
        ]);

      // 401 Unauthorized、認証が必要
      if (postError) return res.status(401).json({ error: postError.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(postData);

    case "DELETE":
      const { data: deleteData, error: deleteError } = await supabase
        .from("shopping_cart")
        .delete()
        .eq("user_id", req.cookies.userID)
        .eq("stock_id", req.query.cart);

      if (deleteError)
        return res.status(401).json({ error: deleteError.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(deleteData);

    case "PATCH":
      const { data: patchData, error: patchError } = await supabase
        .from("shopping_cart")
        .upsert([
          {
            user_id: req.cookies.userID,
            stock_id: req.query.cart,
          },
        ])
        .eq("user_id", req.cookies.userID);

      // 401 Unauthorized、認証が必要
      if (patchError)
        return res.status(401).json({ error: patchError.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(patchData);

    default:
      break;
  }
};
export default getCart;
