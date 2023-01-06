import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const getStock = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase
    .from("stocks")
    .select(`*,items(*)`)
    .order("id", { ascending: true });

  if (error) {
    console.log(error);
  }

  return res.status(200).json(data);
};

export default getStock;
