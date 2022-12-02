import {useEffect, useState} from "react";
import Image from "next/image";
import router from "next/router";
import { useCookie } from "../useCookie";
import type { Stock } from "../../types";

const CartItem = (props: any) => {
    const userID = useCookie();

  const [cart, setCart] = useState(props.data[0]);
  const [cartItems, setCartItems] = useState(cart.stock);
  console.log(props.data);
  console.log(props.data[0]);
  console.log(cart);
   

  const handleDelete = (cart: any, id: any) => {
    if (!userID === true) {
      const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
      const deleted = shoppingCart[0].stock.filter((item: Stock) => item.id !== id);
      const data = {stock: deleted};
      localStorage.setItem('shoppingCart', JSON.stringify([data]));
      router.reload();
    }else{
      const stock = cart.stock;
      const deleted = stock.filter((item: Stock) => item.id !== id);
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
    }
  }

  const noItem = (
    <p>カートの中身はありません</p>
  )

  const cartList = (
    <ul>
      {cart.stock?.map((content: any) => (
        <li key={content.id}>
          <div>
            <div>
              <Image
                src={`/${content.image1}`}
                width={200}
                height={200}
                alt={content.item.name}
                priority
              />
            </div>
            <ul>
              <li>{content.item.name}</li>
              <li>{content.price}</li>
              <li>
                <label htmlFor="count">個数</label>
                <select id="count">
                  <option value="1">1</option>
                </select>
              </li>
            </ul>
            <button onClick={() => handleDelete(cart, content.id)}>カートから削除</button>
          </div>
        </li>
      ))
      }
    </ul>
  );

  return (
    <div>
      {cartItems.length? cartList : noItem} 
    </div>
  );
}

export default CartItem
