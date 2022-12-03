import { useEffect, useState } from "react";
import Image from "next/image";
import router from "next/router";
import { useCookie } from "../useCookie";
import type { Stock } from "../../types";



const cartDeleted = (props: any) => {
    const userID = useCookie();

    const [cart, setCart] = useState(props.data[0]);
    // ショッピングカートDBの中のユーザーごとのかごをとってきている
    const [cartItems, setCartItems] = useState(cart.stock);
    // かごの中の商品を持ってきている
    console.log("data", props.data);
    console.log(props.data[0]);
    console.log(cart);

    const stock = cart.stock;
    const deleted = stock;
    console.log(deleted);

    fetch(`http://localhost:8000/shoppingCart/${userID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "stock": deleted
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    router.reload();

    const noItem = <p>カートの中身はありません</p>

    return (
        <div>
            {cartItems.length && noItem}
        </div>
    );
}

export default cartDeleted;
