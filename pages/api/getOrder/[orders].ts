import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase-client";

export default async function getOrders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { data: getData, error: getError } = await supabase
        .from("orders")
        .select()
        .eq("user_id", req.query.orders)
        .order("id", { ascending: false })
        .limit(1)
        .single();
      if (getError) return res.status(401).json({ error: getError.message });
      return res.status(200).json(getData);

    case "POST":
      const { data: postData, error: postError } = await supabase
        .from("orders")
        .insert(req.body);

      if (postError) return res.status(401).json({ error: postError.message });
      return res.status(200).json(postData);

    //購入後にカートを削除
    case "DELETE":
      const { data: deleteData, error: deleteError } = await supabase
        .from("shopping_cart")
        .delete()
        .eq("user_id", req.query.orders);

      if (deleteError)
        return res.status(401).json({ error: deleteError.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(deleteData);
  }
}
