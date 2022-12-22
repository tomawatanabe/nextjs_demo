import { useState, useEffect } from "react";
import Router from "next/router";
import type { Stock, Item } from "../../types";
import { useCookie } from "../useCookie";
import useSWR from "swr";
import styles from "../../styles/CartButton.module.css";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

const CartButton = ({ stock }: { stock: Stock }) => {
  const userID = useCookie();

  const { data: cart, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/getCart/${stock.id}`,
    fetcher
  );
  
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

      fetch(`${process.env.NEXT_PUBLIC_API}/api/getCart/${stock.id}`, {
        method: "POST",
      }).then((data) => {
        Router.reload();
      });
    }
  };

  // ログイン状態
  const memberCartButton = (
    <div className={"member"}>
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
  )

  // ログアウト状態
  const localCartButton = (
    <div className={"nonMember"}>
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
  )

  // ログイン/ログアウト状態で表示するボタンを分ける　↓
  return (
    <>
      {userID? memberCartButton : localCartButton}
    </>
  );
};

export default CartButton;
