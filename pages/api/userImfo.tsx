import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

const userImfoHundler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      const { data: postData, error: postError } = await supabase
        .from("users")
        .insert(req.body);

      console.log("post,req.body", req.body);

      // 401 Unauthorized、認証が必要
      if (postError) return res.status(401).json({ error: postError.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(postData);

    case "PATCH":
      const { data: patchData, error: patchError } = await supabase
        .from("users")
        .update(req.body)
        .eq("id", req.cookies.userID);

      if (patchError) {
        console.log("patchError", patchError);
      }

      console.log("patch,req.body", req.body);

      // 401 Unauthorized、認証が必要
      if (patchError)
        return res.status(401).json({ error: patchError.message });

      // 200番台は、処理が成功して正常にレスポンスができている状態
      return res.status(200).json(patchData);

    default:
      break;
  }
};

export default userImfoHundler;
