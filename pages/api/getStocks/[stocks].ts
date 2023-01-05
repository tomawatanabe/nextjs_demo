import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase-client";

const getStocks = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PATCH":
      const { data: getData, error: getError } = await supabase
        .from("stocks")
        .upsert({ id: req.query.stocks, deleted: true });
      if (getError) return res.status(401).json({ error: getError.message });
      return res.status(200).json(getData);

    case "POST":
      const { data: postData, error: postError } = await supabase
        .from("stocks")
        .insert(req.body);
      if (postError) return res.status(401).json({ error: postError.message });
      return res.status(200).json(postData);
  }
};

export default getStocks;
