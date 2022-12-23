import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const usedItemsHundler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { data, error } = await supabase
        .from("used_items")
        .insert(req.body);

      console.log("req.body", req.body);

      // 401 Unauthorized、認証が必要
      if (error) return res.status(401).json({ error: error.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(data);

    default:
      break;
  }
};

export default usedItemsHundler;
