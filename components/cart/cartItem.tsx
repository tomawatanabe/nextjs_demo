import {useEffect, useState} from "react";
import useSWR from "swr";
import Image from "next/image";
import router from "next/router";
import { useCookie } from "../useCookie";
import type { Stock } from "../../types";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());


const CartItem = (props: any) => {
  const userID = useCookie();
  const [cart, setCart] = useState(props.data[0]);

  useEffect(() => {
    setCart(props.data[0]);
  }, [props.data]);

  const handleDelete = (cart: any, id: any) => {
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
              router.reload();
            })
            .catch((error) => {
              console.error('Error:', error);
            });

  }

  const noItem = (
    <p>カートの中身はありません</p>
  )

  const cartList = (
    <ul>
      {cart?.stock.map((content: any) => (
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
      {cart?.stock.length? cartList : noItem} 
    </div>
  );
}

export default CartItem
