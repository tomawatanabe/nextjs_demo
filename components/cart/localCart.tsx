import { useState, useEffect } from "react";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import Router from "next/router";
import type{ Stock } from "../../types";

const Local = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('shoppingCart') || '{}'));
    }, []);

    const handleDelete = (cart: any, id: any) => {
        const deleted = cart.stock.filter((item: Stock) => item.id !== id);
        cart.stock = deleted;
        localStorage.setItem('shoppingCart', JSON.stringify([cart]));
        Router.push("/cart");
    }

    return (
        <>
          <CartItem data={data} handleDelete={handleDelete} />
          <CartTotal data={data} />
        </>
    );
} 

export default Local;
