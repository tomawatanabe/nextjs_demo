import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "/styles/Settlement.module.css";

export default function Close() {
  setTimeout(() => {
    location.href = "/";
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
