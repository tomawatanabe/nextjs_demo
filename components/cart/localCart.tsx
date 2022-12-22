import { useState, useEffect } from "react";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import Router from "next/router";
import type { Stock, ShoppingCart } from "../../types";
import Link from "next/link";
import styles from "../../styles/Cart.module.css";

const Local = () => {
  const [data, setData] = useState<[ShoppingCart] | []>([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
  }, []);

  const handleDelete = (cart: any, id: number) => {
    const deleted = cart.stock.filter((item: Stock) => item.id !== id);
    cart.stock = deleted;
    localStorage.setItem("shoppingCart", JSON.stringify([cart]));
    Router.reload();
  };

  return (
    <>
      <CartItem data={data} handleDelete={handleDelete} />
      {/* <CartTotal data={data} /> */}
      <div
        style={{ display: data[0]?.stock_id.length ? "block" : "none" }}
        className={styles.logoutFrame}
      >
        <p style={{ color: "red", fontWeight: "bold" }}>
          購入するにはログインしてください
        </p>
        <Link href="/login/loginPage" legacyBehavior>
          <a className={styles.linkDeco}>ログインはこちら</a>
        </Link>
      </div>
    </>
  );
};

export default Local;
