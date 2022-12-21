import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const getStock = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from("stocks").select(
    `id,itemID,price,size,image1,image2,image3,image4,image5,amount,arrival,condition,deleted,
      items(id,name,series,year,description,setprice,color,deleted)`
  );

  if (error) {
    console.log(error);
  }

  return res.status(200).json(data);
};

export default getStock;
