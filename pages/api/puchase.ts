import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";


const upDateSettlement = async (req: NextApiRequest, res: NextApiResponse) => {
    // １、注文情報を登録
    // 下記のinsertしたいdataの内容はsettlement index内で定数にいれておくる？
    switch (req.method) {
        case "POST":
            const { data: postOrder, error: postError } = await supabase
                .from("order")
                .insert([
                    {
                        user_id: req.cookies.userID,
                        stock_id: req.query.stock,
                        note: req.query.note,
                        paymentMethod: req.query.paymentMethod,
                        shipStatus: "未発送",
                        totalPrice: req.query.total,
                    }
                ]);
            // ２、在庫を更新して取得
        case "PATCH":
            const { data: patchStock, error: patchError } = await supabase
                .from("stocks")
                .update([{ deleted: false }])
                .match([{ deleted: true }])
                .select()

            // 3, 注文商品を登録 
            // 上記を.select("order_items")で３番の処理もできる？
            const { data: orderItems, error: e } = await supabase
                .from("order_items")
                .insert([
                    {}
                ])
    }
}
    export default upDateSettlement;





// const favoriteHundler = async (req: NextApiRequest, res: NextApiResponse) => {
//   switch (req.method) {
//     case "GET":
//       const { data: getData, error: getError } = await supabase
//         .from("favorite_items_duplicate")
//         .select()
//         .eq("user_id", req.cookies.userID)
//         .eq("stock_id", req.query.fav);
//       // 401 Unauthorized、認証が必要
//       if (getError) return res.status(401).json({ error: getError.message });
//       // 200番台は、処理が成功して正常にレスポンスができている状態
//       return res.status(200).json(getData);

//     case "POST":
//       const { data: postData, error: postError } = await supabase
//         .from("favorite_items_duplicate")
//         .insert([
//           {
//             user_id: req.cookies.userID,
//             stock_id: req.query.fav,
//           },
//         ]);

//       // 401 Unauthorized、認証が必要
//       if (postError) return res.status(401).json({ error: postError.message });

//       // 200番台は、処理が成功して正常にレスポンスができている状態
//       return res.status(200).json(postData);

//     case "DELETE":
//       const { data: deleteData, error: deleteError } = await supabase
//         .from("favorite_items_duplicate")
//         .delete()
//         .eq("user_id", req.cookies.userID)
//         .eq("stock_id", req.query.fav);

//       // 401 Unauthorized、認証が必要
//       if (deleteError)
//         return res.status(401).json({ error: deleteError.message });

//       // 200番台は、処理が成功して正常にレスポンスができている状態
//       return res.status(200).json(deleteData);

//     default:
//       break;
//   }
// };

// export default favoriteHundler;
