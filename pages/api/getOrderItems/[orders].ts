import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase-client";

const getOrderItems = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { data: postData, error: postError } = await supabase
        .from("order_items")
        .insert(req.body);
      if (postError) return res.status(401).json({ error: postError.message });
      return res.status(200).json(postData);
  }
};

export default getOrderItems;
