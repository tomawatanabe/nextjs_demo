import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import { useCookie } from "../useCookie";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import Router from "next/router";
import type { Stock, ShoppingCart } from "../../types";
import cart from "../../pages/api/cart";
import Link from "next/link";
import styles from "../../styles/Cart.module.css";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

const Members = () => {
  const userID = useCookie();

  // ローカルストレージ内のデータがあるか確認
  const [localData, setLocalData] = useState<any[]>([]);

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
  }, []);

  // サーバ上のデータを取得
  let { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/shoppingCart?id=${userID}`,
    fetcher
    // ユーザのカートのデータを取得
  );

  useEffect(() => {
    mutate(`${process.env.NEXT_PUBLIC_API}/api/shoppingCart?id=${userID}`);
  }, []);
// 


  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // カート内商品削除
  const handleDelete = (cart: ShoppingCart, id: number) => {
    const stock = cart.stock;
    const deleted = stock.filter((item: Stock) => item.id !== id);

    fetch(`${process.env.NEXT_PUBLIC_API}/api/shoppingCart/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: deleted,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        mutate(`${process.env.NEXT_PUBLIC_API}/api/shoppingCart?id=${userID}`);
        Router.push("/cart");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // ログイン前のカート内商品をログイン後のカートに移動
  const handleCombine = (cart: ShoppingCart) => {
    const stock = cart.stock;
    for (const localItem of localData[0]?.stock) {
      if (stock.some((serverItem: any) => serverItem.id === localItem.id)) {
        continue;
      }
      stock.push(localItem);
    }

    fetch(`${process.env.NEXT_PUBLIC_API}/api/shoppingCart/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: stock,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        Router.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleClick = () => {
    return Router.push("/settlement");
  };

  // ログイン前のカート内商品をログイン後のカートに移動したくない場合
  const rejectCombine = () => {
    localStorage.clear();
    Router.reload();
  };

  return (
    <>
      <div
        className={styles.attention}
        style={{
          display: localData[0]?.stock.length ? "block" : "none",
        }}
      >
        <div className={styles.frame}>
          <div className={styles.frame_title}>注意！</div>
          <p>
            ログイン前のカートに商品があります。
            <br /> 現在のアカウントのカートにその商品を移動しますか？
          </p>
          <ul>
            {localData[0]?.stock.map((cartItem: Stock) => {
              <li>{cartItem?.items.name}</li>;
            })}
          </ul>
          <button
            className={styles.yes_btn}
            onClick={() => handleCombine(data[0])}
          >
            はい
          </button>
          <button className={styles.no_btn} onClick={() => rejectCombine()}>
            いいえ
          </button>
        </div>
      </div>
      <CartItem data={data} handleDelete={handleDelete} />
      <CartTotal data={data} />
      <div style={{ display: data[0]?.stock.length ? "block" : "none" }}>
        <input
          type="button"
          className="idbutton"
          onClick={handleClick}
          value="購入手続きへ"
        />
      </div>
    </>
  );
};

export default Members;
