import {useEffect, useState} from "react";
import Image from "next/image";
import router from "next/router";
import { useCookie } from "../useCookie";
import type { Stock } from "../../types";



const CartItem = (props: any) => {
    const userID = useCookie();

  const [cart, setCart] = useState(props.data[0]);
  const [cartItems, setCartItems] = useState(cart.stock);
  console.log(cart);
   

  const handleDelete = (id: any) => {
    if (!userID === true) {
      const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
      const deleted = shoppingCart[0].stock.filter((item: Stock) => item.id !== id);
      const data = {stock: deleted};
      localStorage.setItem('shoppingCart', JSON.stringify([data]));
      router.reload();
    }else{
      fetch(`http://localhost:8000/shoppingCart/${userID}/stock?id=${id}`, {
          method: 'DELETE'
      })
          .then(console.log);
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
            <button onClick={() => handleDelete(content.id)}>カートから削除</button>
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
