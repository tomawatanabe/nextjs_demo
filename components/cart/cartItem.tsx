import {useEffect, useState} from "react";
import useSWR from "swr";
import Image from "next/image";
import router from "next/router";
import { useCookie } from "../useCookie";
import type { Stock } from "../../types";

const CartItem = (props: any) => {
  const userID = useCookie();
  const [cart, setCart] = useState(props.data[0]);

  useEffect(() => {
    setCart(props.data[0]);
  }, [props.data]);

  
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

            <button onClick={() => props.handleDelete(cart, content.id) className="idbutton"}>カートから削除</button>
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
