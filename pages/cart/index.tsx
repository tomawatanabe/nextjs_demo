import Link from "next/link";
import Members from "../../components/cart/membersCart";
import Local from "../../components/cart/localCart";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useCookie } from "../../components/useCookie";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Cart.module.css";

// const fetcher = (resource: string): Promise<any> =>
//   fetch(resource).then((res) => res.json());

const ShoppingCart = () => {
  const userID = useCookie();

  return (
    <>
      <Header />
      <div className={styles.cart_main_content}>
        <h1>カート</h1>
        <p>※注意</p>
        <p>
          カート内の商品は取り置きではありません。購入手続きの時点で売り切れている可能性があります。
        </p>
        {userID ? <Members /> : <Local />}
        {/* <Link href="#" legacyBehavior>
        購入手続きへ進む
      </Link> */}
        <br />
        <Link href="/" legacyBehavior>
          トップページへ
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
