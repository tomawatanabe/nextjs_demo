import Link from "next/link";
import CartItem from "../../components/cart/cartItem";
import CartTotal from "../../components/cart/cartTotal";
import {useState, useEffect} from "react";
import useSWR from "swr";
import { useCookie } from "../../components/useCookie";
// import type { ShoppingCart } from "../../types";

const fetcher = (resource: string): Promise<any> => fetch(resource).then((res) => res.json()); 

const ShoppingCart = () => {
    const userID = useCookie();
    let {data, error, mutate} = useSWR(`http://localhost:8000/shoppingCart?id=${userID}`, fetcher);
    
    useEffect(() => {
      if(!userID === true){
        const getjson = localStorage.getItem('shoppingCart') || '{}';
        mutate(JSON.parse(getjson));
      }else{
        localStorage.clear();
      }
    }, []);
    console.log(data);
    
    if (error) return (<div>failed to load</div>);
    if (!data) return (<div>loading...</div>);


  return (
    <div>
      <h1>カート</h1>
      <p>※注意<br />カート内の商品は取り置きではありません。購入手続きの時点で売り切れている可能性があります。</p>
      <CartItem data={data} />
      <CartTotal data={data} />
      <Link href="http://localhost:3000/settlement" legacyBehavior>
        購入手続きへ進む
      </Link>
    </div>
  );
}

export default ShoppingCart
