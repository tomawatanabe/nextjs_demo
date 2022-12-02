import type { Stock } from "../types";
import type { FavoriteItem } from "../types";
import Router from "next/router";
import { useCookie } from "./useCookie";

const AddFavorit = ({ stock }: { stock: Stock }) => {
  const cookieName = useCookie();

  const stockData: FavoriteItem = {
    itemId: stock.id,
    cookieName: cookieName,
    name: stock.item.name,
    price: stock.price,
    size: stock.size,
    imagePath: stock.image1,
    condition: stock.condition,
    deleted: false,
  };

  const sendFavo = async () => {
    //cookie持ってなかったらログイン画面へ
    if (!cookieName) {
      Router.push("/login/loginPage");
      return;
    }

    const res = await fetch(
      `http://localhost:8000/favoriteItems?deleted=false&cookieName=${cookieName}&itemId=${stockData.itemId}`
    );
    const data = await res.json();

    //data.lengthが1以上ならお気に入りできない
    if (data.length) {
      alert("既にお気に入り済みです");
    } else {
      fetch("http://localhost:8000/favoriteItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <button onClick={sendFavo}>お気に入りに追加</button>
    </div>
  );
};

export default AddFavorit;
