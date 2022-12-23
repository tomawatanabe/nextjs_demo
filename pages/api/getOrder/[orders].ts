import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase-client";


const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            const { data: getData, error: getError } = await supabase
                .from("orders")
                .select("id")
                .eq("user_id", req.query.orders)
            if (getError) return res.status(401).json({ error: getError.message });
            return res.status(200).json(getData)

        case "POST":
            const { data: postData, error: postError } = await supabase
                .from("orders")
                .insert(req.body)
            if (postError) return res.status(401).json({ error: postError.message });
            return res.status(200).json(postData)
    }
}
