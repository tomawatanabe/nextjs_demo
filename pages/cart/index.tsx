import Link from "next/link";
import CartItem from "../../components/cart/cartItem";
import CartTotal from "../../components/cart/cartTotal";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useCookie } from "../../components/useCookie";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

const ShoppingCart = () => {
  const userID = useCookie();
  let { data, error } = useSWR(
    `http://localhost:8000/shoppingCart?id=${userID}`,
    fetcher
  );

  useEffect(() => {
    console.log('mutateしました');
    mutate(`http://localhost:8000/shoppingCart?id=${userID}`);
  }, [])

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Header />
      <h1>カート</h1>
      <p>
        ※注意
        <br />
        カート内の商品は取り置きではありません。購入手続きの時点で売り切れている可能性があります。
      </p>
      <CartItem data={data} />
      <CartTotal data={data} />
      <Link href="#" legacyBehavior>
        購入手続きへ進む
      </Link>
      <br />
      <Link href="/" legacyBehavior>
        トップページへ
      </Link>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
