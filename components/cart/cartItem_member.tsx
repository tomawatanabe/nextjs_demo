import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { useCookie } from "../useCookie";
import type { Stock, ShoppingCart } from "../../types";
import styles from "../../styles/Cart.module.css";

const CartItem_members = (props: {
  data: [ShoppingCart] | [];
  handleDelete: (cart: ShoppingCart, id: number) => void;
}) => {
  const userID = useCookie();
  const [cart, setCart] = useState(props.data);

  useEffect(() => {
    setCart(props.data);
  }, [props.data]);

  console.log(cart, "かーと2");
  const noItem = <p>カートの中身はありません</p>;

  const cartList = (
    <ul className={styles.cart_ul}>
      {cart?.map((content: ShoppingCart) => (
        <li className={styles.cart_li} key={content.id}>
          <div>
            <div>
              <Image
                src={`/${content.stocks.image1}`}
                width={200}
                height={200}
                alt={content.stocks.items.name}
                priority
              />
            </div>
            <ul className={styles.cart_ul}>
              <li className={styles.cart_li}>
                商品名　{content.stocks.items.name}
              </li>
              <li className={styles.cart_li}>
                ¥ {content.stocks.price.toLocaleString()}（税込）
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
                  onClick={() => props.handleDelete(content, content.stocks.id)}
                />
              </li>
            </ul>
            <hr />
          </div>
        </li>
      ))}
    </ul>
  );

  return <div>{cart?.length ? cartList : noItem}</div>;
};

export default CartItem_members;
