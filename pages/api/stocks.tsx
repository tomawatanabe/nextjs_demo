import { Item } from "../../types";
import { Stock } from "../../types";

export default async function Stocks() {
<<<<<<< HEAD
  const item = await fetch("http://localhost:8000/items");
  const itemsdata = await item.json();
  const stock = await fetch("http://localhost:8000/stock");
=======
  const item = await fetch(`${process.env.NEXT_PUBLIC_API}/api/items`);
  const itemsdata = await item.json();
  const stock = await fetch(`${process.env.NEXT_PUBLIC_API}/api//stock`);
>>>>>>> cb48e1140aa98012d685d40f2393f09d23842334
  const stocksdata = await stock.json();

  stocksdata.map((stock: Stock) => {
    //IDが一致するもののみの配列を作成
    const items = itemsdata.filter((item: Item) => stock.itemID === item.id);
    stock.item = items[0];

<<<<<<< HEAD
    fetch(`http://localhost:8000/stock/${stock.itemID}`, {
=======
    fetch(`${process.env.NEXT_PUBLIC_API}/api/stock/${stock.itemID}`, {
>>>>>>> cb48e1140aa98012d685d40f2393f09d23842334
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stock),
    })
      .then((response) => response.json())
      .then((stock) => {});
  });
}
