import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookieOriginal } from "./useCookie";

export default function Header() {
  const router = useRouter();
  const cookieOriginal = useCookieOriginal();

  const [reload, setReload] = useState(0);

  const logout = (event: React.MouseEvent<HTMLInputElement>) => {
    document.cookie = `userID=;max-age=-86400s`;
    setReload((event) => reload + 1);
  };

  const login = () => {
    router.push("/login/loginPage");
  };

  const correction = () => {
    if (cookieOriginal === "userID=" || "") {
      return (
        <div className={styles.headerin}>
          <li key="signup" className={styles.lis}>
            <Link href="/signup" className={styles.link}>
              会員登録
            </Link>
          </li>
          <li key="login" className={styles.lis}>
            <input
              type="button"
              className={styles.button}
              onClick={login}
              value="ログイン"
            />
          </li>
        </div>
      );
    } else {
      return (
        <div className={styles.headerin}>
          <li key="signup" className={styles.lis}>
            <Link href="/mypage" className={styles.link}>
              マイページ
            </Link>
          </li>
          <input
            type="button"
            onClick={logout}
            value="ログアウト"
            className={styles.button2}
          />
        </div>
      );
    }
  };
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.imageIcon}>
          <Image
            src="/shoplogo.png"
            alt="syoplogo"
            height={160}
            width={210}
            className={styles.image}
          />
        </div>
      </Link>
      <ul className={styles.ul}>
        <li key="mypage" className={styles.lis}>
          <Link href="/cart" className={styles.link}>
            カート
          </Link>
        </li>
        <li key="cart" className={styles.lis}>
          <Link href="/contact" className={styles.link}>
            お問い合わせ
          </Link>
        </li>
        <li key="favorit" className={styles.lis}>
          <Link href="/purchase" className={styles.link}>
            買取受付
          </Link>
        </li>
        {correction()}
      </ul>
    </header>
  );
}
