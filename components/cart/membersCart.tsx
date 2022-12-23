import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import { useCookie } from "../useCookie";
import CartTotalMember from "./cartTotal_member";
import Router from "next/router";
import type { Stock, ShoppingCart } from "../../types";
import styles from "../../styles/Cart.module.css";
import CartItem_members from "./cartItem_member";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

const Members = () => {
  const userID = useCookie();

  // ローカルストレージ内のデータがあるか確認
  const [localData, setLocalData] = useState<any[]>([]);

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
  }, []);

  // OK サーバ上のデータを取得
  let { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/getCart/${userID}`,
    fetcher
    // ユーザのカートのデータを取得
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  // カート内商品削除
  const handleDelete = (cart: ShoppingCart, id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API}/api/getCart/${id}`, {
      method: "DELETE",
    });
    mutate(`${process.env.NEXT_PUBLIC_API}/api/getCart/${userID}`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    Router.push("/cart");
  };

  // ログイン前のカート内商品をログイン後のカートに移動
  const handleCombine = (cart: ShoppingCart[]) => {
    console.log(cart);
    for (const localItem of localData[0]?.stock_id) {
      if (
        cart?.some((serverItem: any) => serverItem.stock_id === localItem.id)
      ) {
        continue;
      }
      fetch(`${process.env.NEXT_PUBLIC_API}/api/getCart/${localItem.id}`, {
        method: "POST",
      });
    }
    localStorage.clear();
    Router.reload();
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
          display: localData[0]?.stock_id.length ? "block" : "none",
        }}
      >
        <div className={styles.frame}>
          <div className={styles.frame_title}>注意！</div>
          <p>
            ログイン前のカートに商品があります。
            <br /> 現在のアカウントのカートにその商品を移動しますか？
          </p>
          <ul>
            {localData[0]?.stock_id.map((cartItem: Stock) => {
              <li>{cartItem?.items.name}</li>;
            })}
          </ul>
          <button
            className={styles.yes_btn}
            onClick={() => handleCombine(data)}
          >
            はい
          </button>
          <button className={styles.no_btn} onClick={() => rejectCombine()}>
            いいえ
          </button>
        </div>
      </div>
      <CartItem_members data={data} handleDelete={handleDelete} />
      <CartTotalMember data={data} />
      <div style={{ display: data?.length ? "block" : "none" }}>
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
