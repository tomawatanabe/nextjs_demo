import { NextApiRequest, NextApiResponse } from "next";
import { ShoppingCart, Stock } from "../../types";

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
  const userID = req.cookies.userID;
  console.log(userID);

  if (userID === "userID=" || undefined) {
    console.log("未ログイン");
  } else {
    const cart = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/shoppingCart?id=${userID}`
    );
    const shoppingcartData: ShoppingCart[] = await cart.json();
    const cartData = shoppingcartData[0];

    const addCart: { stockID: number } = req.body;
    //{stockID:~}が取得できる
    const stock = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/stock?id=${addCart.stockID}`
    );
    const stockData: Stock[] = await stock.json();

    cartData.stock.push(stockData[0]);

    fetch(`${process.env.NEXT_PUBLIC_API}/api/shoppingCart/${cartData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => response.json())
      .then((cartData) => {
        alert("カートに追加しました");
        console.log("cartにstockを追加しました");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  res.status(200).end();
}
