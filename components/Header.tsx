import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Header() {
  const logout = Cookies.remove("cookie_name");

  return (
    <div>
      <header className={styles.header}>
        <Image src="/shoplogo.png" alt="syoplogo" height={144} width={144} />
        <ul>
          <li key="mypage">
            <Link href="/">マイページ</Link>
          </li>
          <li key="cart">
            <Link href="/">カート</Link>
          </li>
          <li key="favorit">
            <Link href="/">お気に入り</Link>
          </li>
          <li key="logout">
            <Link href="/login/loginPage" onChange={logout}>
              ログアウト
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
