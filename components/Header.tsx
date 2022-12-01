import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookie } from "./useCookie";

export default function Header() {
  const router = useRouter();
  const cookie = useCookie();

  const [reload, setReload] = useState(0);

  const logout = (event: React.MouseEvent<HTMLInputElement>) => {
    document.cookie = `userID=;max-age=-86400s`;
    setReload((event) => reload + 1);
  };

  const login = () => {
    router.push("/login/loginPage");
  };

  const correction = () => {
    if (cookie === "userID=") {
      return (
        <div>
          <li key="signup">
            <Link href="/signup">会員登録</Link>
          </li>
          <li key="login">
            <input type="button" onClick={login} value="ログイン" />
          </li>
        </div>
      );
    } else {
      return <input type="button" onClick={logout} value="ログアウト" />;
    }
  };
  return (
    <div>
      <header className={styles.header}>
        <Image src="/shoplogo.png" alt="syoplogo" height={144} width={144} />
        <ul>
          <li key="mypage">
            <Link href="/">マイページ</Link>
          </li>
          <li key="cart">
            <Link href="/contact">お問い合わせ</Link>
          </li>
          <li key="favorit">
            <Link href="/purchase">買取受付</Link>
          </li>
          {correction()}
        </ul>
      </header>
    </div>
  );
}
