import { useState, useEffect } from "react";
import Router from "next/router";
import type { Stock } from "../../types";
import { useCookie } from "../useCookie";

const CartButton = ({ stock }: {stock: Stock}) => {
    
    const userID = useCookie();

    console.log(stock);

    const data = {
        stock: [stock]
    };
    
    //カート追加時にshoppingCart内にstockデータを追加
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("stockID", stock.id);
    await fetch("/api/cart", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ stockID: stock.id }),
    });
  };

    const addCartItem = async () => {
        if (!userID === true) {
            if(localStorage.getItem("shoppingCart")){
              const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
              shoppingCart[0].stock.push(stock);
              localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            }else{
              localStorage.setItem('shoppingCart', JSON.stringify([data]));
            }
        } else { 
          const res = await fetch(`http://localhost:8000/shoppingCart/${userID}`);
          const user = await res.json();
          const target = stock;
          if(user.stock.some((item: any) => 
            item.id === target.id 
          )){
            alert("既にカートに追加済みです");
          }else{
            user.stock.push(stock);
  
            fetch(`http://localhost:8000/shoppingCart/${userID}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  "stock": user.stock
                  }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Success:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }

        }
    }

    return (
    <form onSubmit={handleSubmit}>
      <button onClick={addCartItem}>カートへ追加</button>
    </form>
  );
}

export default CartButton;