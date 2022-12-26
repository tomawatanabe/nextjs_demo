import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase-client";


const getOrderItems = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            const { data: getData, error: getError } = await supabase
                .from("order_items")
                .select("id,order_id,user_id,stocks(itemID,image1,size,price,condition,items(name))")
                .eq("user_id", req.cookies.userID)
                .order("id", { ascending: false });

            if (getError) return res.status(401).json({ error: getError.message });
            return res.status(200).json(getData)
    }
}


export default getOrderItems;



// const { data, error } = await supabase
// .from('order_items')
// .select(`
//     order_id(
//         order_date,
//         payment_method,
//         ship_status,
//         total_price,
//     ),
//     stock_id(
//         image1,
//         items(*)
//     )
// `)
// .eq("user_id", req.cookies.userID);
// .order('name', { foreignTable: 'orders', ascending: false })
