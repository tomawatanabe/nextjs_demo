import { NextApiRequest, NextApiResponse } from "next";
import { ShoppingCart, Stock } from "../../types";

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
  const { userID } = req.cookies;
  const cart = await fetch(
    `http://localhost:8000/shoppingCart?userID=${userID}`
  );
  const cartData: ShoppingCart = await cart.json();

  const addCart: { stockID: number } = req.body;
  //{stock.id,数量}が取得できる
  const stock = await fetch(
    `http://localhost:8000/shoppingCart?stockID=${addCart.stockID}`
  );
  const stockData: Stock = await stock.json();

  cartData.stock.push(stockData);

  res.status(200).end();
}
