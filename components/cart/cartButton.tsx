import { useState, useEffect } from "react";
import Router from "next/router";
import type { Stock, Item } from "../../types";
import { useCookie } from "../useCookie";
import useSWR from "swr";
import styles from "../../styles/CartButton.module.css";
import { supabase } from "../../lib/supabase-client";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

const CartButton = ({ stock, item }: { stock: Stock; item: Item }) => {
  const userID = useCookie();

  const { data: cart } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/getCart/${stock.id}`,
    fetcher
  );

  console.log(cart);

  type Memo = { id: number; userID: number; stock: any[] } | null;

  const [localData, setLocalData] = useState<any[]>([]);

  const dataType = {
    stock_id: [stock],
  };

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
  }, []);

  const addCartItem = async () => {
    if (!userID === true) {
      // ログアウト状態でカートに商品追加
      if (localStorage.getItem("shoppingCart")) {
        const target = stock;

        if (localData[0].stock_id.some((item: Item) => item.id === target.id)) {
          alert("既にカートに追加済みです");
          return;
        } else {
          localData[0].stock_id.push(stock);
          localStorage.setItem("shoppingCart", JSON.stringify(localData));
          setLocalData(
            JSON.parse(localStorage.getItem("shoppingCart") || "{}")
          );
        }
      } else {
        localStorage.setItem("shoppingCart", JSON.stringify([dataType]));
        setLocalData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
      }
    } else {
      // Supabase

      fetch(`${process.env.NEXT_PUBLIC_API}/api/getCart/${stock.id}`, {
        method: "POST",
      }).then((data) => {
        Router.reload();
      });
    }
  };

  // ログイン/ログアウト状態で表示するボタンを分ける　↓
  return (
    <>
      <div style={{ display: userID ? "block" : "none" }} className={"member"}>
        {cart?.some((cartItem: any) => cartItem.stock_id === stock.id) ? (
          <button
            className={styles.addedCartBtn}
            onClick={addCartItem}
            disabled
          >
            カートに追加済み
          </button>
        ) : (
          <button className={styles.addCartBtn} onClick={addCartItem}>
            カートへ追加
          </button>
        )}
      </div>
      <div
        style={{ display: userID ? "none" : "block" }}
        className={"nonMember"}
      >
        {localData[0]?.stock_id.some((item: Item) => item.id === stock.id) ? (
          <button
            className={styles.addedCartBtn}
            onClick={addCartItem}
            disabled
          >
            カートに追加済み
          </button>
        ) : (
          <button className={styles.addCartBtn} onClick={addCartItem}>
            カートへ追加
          </button>
        )}
      </div>
    </>
  );
};

export default CartButton;
