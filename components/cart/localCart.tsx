
import { useState, useEffect } from "react";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import Router from "next/router";
import type { Stock } from "../../types";
import Link from "next/link";

const Local = () => {
    const [data, setData] = useState<any[]>([]);


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
            <div style={{ display: data[0]?.stock.length ? "block" : "none" }}>
                <Link href="#" legacyBehavior>
                    購入手続きへ進む
                </Link>
            </div>
        </>
    );
}

export default Local;
