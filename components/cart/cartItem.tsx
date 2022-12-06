import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import router from "next/router";
import { useCookie } from "../useCookie";
import type { Stock } from "../../types";
import styles from "../../styles/Cart.module.css";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());


const CartItem = (props: any) => {
  const userID = useCookie();
  const [cart, setCart] = useState(props.data[0]);

  useEffect(() => {
    setCart(props.data[0]);
  }, [props.data]);


  const noItem = <p>カートの中身はありません</p>;


  const cartList = (
    <ul className={styles.cart_ul}>
      {cart?.stock.map((content: any) => (
        <li className={styles.cart_li} key={content.id}>
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
            <ul className={styles.cart_ul}>
              <li className={styles.cart_li}>商品名　{content.item.name}</li>
              <li className={styles.cart_li}>
                ¥ {content.price.toLocaleString()}（税込）
              </li>
              <li className={styles.cart_quantity}>
                <label htmlFor="count" className={styles.cart_count_label}>
                  個数
                </label>
                <select id="count">
                  <option value="1">1</option>
                </select>
                <Image
                  className={styles.btn}
                  src="/images/trashbox.png"
                  alt="削除ボタン"
                  width={30}
                  height={30}
                  onClick={() => props.handleDelete(cart, content.id)}
                />
              </li>
            </ul>
            <hr />
          </div>
        </li>
      ))}
    </ul>
  );


  return <div>{cart?.stock.length ? cartList : noItem}</div>;
};


export default CartItem;
