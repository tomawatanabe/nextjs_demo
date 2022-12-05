import { useState, useEffect } from "react";
import Router from "next/router";
import type { Stock } from "../../types";
import { useCookie } from "../useCookie";

const CartButton = ({ stock }: { stock: Stock }) => {
  const userID = useCookie();

  console.log(stock);

  const dataType = {
    stock: [stock],
  };

  const addCartItem = async () => {
        if (!userID === true) {
          // ログアウト状態でカートに商品追加
            if(localStorage.getItem("shoppingCart")){
              const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
              const target = stock;

              if(shoppingCart[0].stock.some((item: any) => 
                  item.id === target.id 
              )){
                alert("既にカートに追加済みです");
                return;
              }else{
                shoppingCart[0].stock.push(stock);
                localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                alert("カートに追加しました");
              }

            }else{
              localStorage.setItem('shoppingCart', JSON.stringify([dataType]));
              alert("カートに追加しました");
            }
        } else { 
          // ログイン状態でカート商品追加
          const res = await fetch(`http://localhost:8000/shoppingCart/${userID}`);
          const user = await res.json();
          const target = stock;
          // console.log(user);
          // console.log(target);
          if(user?.stock.some((item: any) => 
            item.id === target.id 
          )){
            alert("既にカートに追加済みです");
            return;
          }else{
            // user.stock.push(stock);
            alert("カートに追加しました");
            fetch("/api/cart", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ stockID: stock.id }),
            })
          }
      }
  };

    return (
      <button onClick={addCartItem}>カートへ追加</button>
  );
};

export default CartButton;
