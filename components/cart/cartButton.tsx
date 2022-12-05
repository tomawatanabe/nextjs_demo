import { useState, useEffect } from "react";
import Router from "next/router";
import type { Stock } from "../../types";
import { useCookie } from "../useCookie";

const CartButton = ({ stock }: { stock: Stock }) => {
  const userID = useCookie();

  console.log(stock);

  const data = {
    stock: [stock],
  };

  //カート追加時にshoppingCart内にstockデータを追加

  const addCartItem = async () => {
    if (!userID === true) {
      alert("ログインしてください");
    } else {
      const res = await fetch(`http://localhost:8000/shoppingCart/${userID}`);
      const user = await res.json();
      const target = stock;
      console.log(user);
      console.log(target);
      if (user.stock.some((item: any) => item.id === target.id)) {
        alert("既にカートに追加済みです");
        return;
      } else {
        user.stock.push(stock);

        fetch(`http://localhost:8000/shoppingCart/${userID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: user.stock,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        alert("カートに追加しました");
      }

      fetch(`http://localhost:8000/shoppingCart/${userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stock: user.stock,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      await fetch("/api/cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ stockID: stock.id }),
      });
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    // </form>
    <button onClick={addCartItem} className="idbutton">
      カートへ追加
    </button>
  );
};

export default CartButton;
