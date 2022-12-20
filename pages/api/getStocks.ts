import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const getStocks = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from("stocks").select(`
  size,
  price,
  image1,
  image2,
  image3,
  image4,
  image5,
  arrival,
  condition,
  items (
    name,
    series,
    year,
    description,
    setprice,
    color,
    deleted
  )
`);

  // 401 Unauthorized、認証が必要
  if (error) return res.status(401).json({ error: error.message });

  // 200番台は、処理が成功して正常にレスポンスができている状態
  return res.status(200).json(data);
};

export default getStocks;
