import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase-client";


const getOrderItems = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            const { data: getData, error: getError } = await supabase
                .from("order_items")
                .select("id,orders(ship_status,payment_method,order_date,total_price),user_id,stocks(item_id,image1,size,price,condition,items(name))")
                .eq("user_id", req.cookies.userID)
                .order("id", { ascending: false });

            if (getError) return res.status(401).json({ error: getError.message });
            return res.status(200).json(getData)
    }
}


export default getOrderItems;
