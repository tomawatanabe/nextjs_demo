import { useState, useEffect } from "react";
import Router from "next/router";
import type { Stock, Item } from "../../types";
import { useCookie } from "../useCookie";
import useSWR from "swr";
import styles from "../../styles/CartButton.module.css";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

const CartButton = ({ stock, item }: { stock: Stock; item: Item }) => {
  const userID = useCookie();

  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/shoppingCart/${userID}`,
    fetcher
  );
  const [localData, setLocalData] = useState<any[]>([]);

  const dataType = {
    stocks: [stock],
  };

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
  }, []);

  const addCartItem = async () => {
    if (!userID === true) {
      // ログアウト状態でカートに商品追加
      if (localStorage.getItem("shoppingCart")) {
        const target = stock;

        if (localData[0].stock.some((item: Item) => item.id === target.id)) {
          alert("既にカートに追加済みです");
          return;
        } else {
          localData[0].stock.push(stock);
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
      // ログイン状態でカート商品追加
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/shoppingCart/${userID}`
      );
      const user = await res.json();
      const target = stock;

      if (user?.stock.some((item: Item) => item.id === target.id)) {
        alert("既にカートに追加済みです");
        return;
      } else {
        fetch("/api/cart", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ stockID: stock.id }),
        });
        mutate(`${process.env.NEXT_PUBLIC_API}/api/shoppingCart/${userID}`);
        Router.reload();
      }
    }
  };

  // ログイン/ログアウト状態で表示するボタンを分ける　↓
  return (
    <>
      <div style={{ display: userID ? "block" : "none" }} className={"member"}>
        {data?.stock?.some((item: Item) => item.id === stock.id) ? (
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
        {localData[0]?.stock.some((item: Item) => item.id === stock.id) ? (
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
