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

  const { data: orderID, error: orderError } = useSWR(
    `/api/getOrder/${userID}`,
    fetcher
  );
  const { data: cartItem, error: cartError } = useSWR(
    `/api/getCart/${userID}`,
    fetcher
  );

  if (orderError) return <div>loading...</div>;
  if (!orderID) return <div>loading...</div>;

  if (cartError) return <div>loading...</div>;
  if (!cartItem) return <div>loading...</div>;

  console.log(orderID, "おーだーあいでぃ");

  const getItems = () => {
    for (const post of cartItem) {
      const postData = [{ order_id: orderID.id, stock_id: post.stock_id }];
      console.log(postData, "ぽすとでーた");
      fetch(`/api/getOrderItems/${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    }
  };
  getItems();

  // カートの中身を削除する
  const DeletedItems = () => {
    fetch(`api/getOrder/${userID}`, {
      method: "DELETE",
    });
  };
  // DeletedItems();

  setTimeout(() => {
    location.href = "/";
  }, 3 * 1000);

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
