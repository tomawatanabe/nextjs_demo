import Link from "next/link";
import useSWR from "swr";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "/styles/Settlement.module.css";
import { useCookie } from "../../components/useCookie";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

export default function Close() {
  const userID = useCookie();

  const { data: orderID } = useSWR(`/api/getOrder/${userID}`, fetcher);
  const { data: cartItem } = useSWR(`/api/getCart/${userID}`, fetcher);

  const getItems = async () => {
    for (const post of cartItem) {
      const postData = [{ order_id: orderID.id, stock_id: post.stock_id }];
      await fetch(`/api/getOrderItems/${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    }
  };

  // カートの中身を削除する
  const DeletedItems = () => {
    fetch(`api/getOrder/${userID}`, {
      method: "DELETE",
    });
  };
  // DeletedItems();

  setTimeout(() => {
    location.href = "/";
    getItems();
  }, 2 * 1000);

  return (
    <div>
      <Header />
      <div className={styles.close_tenn}>
        <h1>購入手続きが完了しました！</h1>
        <h2>またのご利用お待ちしております。</h2>
        <Link href="/">トップページに戻る</Link>
      </div>
      <Footer />
    </div>
  );
}
