import {useEffect, useState} from "react";
import Image from "next/image";
import router from "next/router";
import { useCookie } from "../useCookie";



const CartItem = (props: any) => {
    const userID = useCookie();

  const [cart, setCart] = useState(props.data[0]);
  console.log(cart);

  const handleDelete = (stock: any) => {
    fetch(`http://localhost:8000/shoppingCart/${userID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "deleted": true
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data),
                    router.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
  }

  return (
    <ul>
      {cart.stock?.map((content: any) => (
        <li key={content.stockID}>
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
            <button onClick={() => handleDelete(content)}>カートから削除</button>
          </div>
        </li>
      ))
      }
    </ul>
  );
}

export default CartItem
