import Link from "next/link";
import Members from "../../components/cart/membersCart";
import Local from "../../components/cart/localCart";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useCookie } from "../../components/useCookie";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// const fetcher = (resource: string): Promise<any> =>
//   fetch(resource).then((res) => res.json());

const ShoppingCart = () => {
  const userID = useCookie();

  return (
    <div>
      <Header />
      <h1>カート</h1>
      <p>
          ※注意
          <br />
          カート内の商品は取り置きではありません。購入手続きの時点で売り切れている可能性があります。
      </p>  
      {userID? 
        <Members />
        :
        <Local />
      }
      <br />
      <Link href="/" legacyBehavior>
        トップページへ
      </Link>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
