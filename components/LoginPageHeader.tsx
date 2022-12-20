import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookie, useCookieOriginal, useName } from "./useCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSpaghettiMonsterFlying,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const router = useRouter();
  const cookieOriginal = useCookieOriginal();
  const cookie = useCookie();
  const name = useName();

  const [reload, setReload] = useState(0);

  const logout = (event: React.MouseEvent<HTMLInputElement>) => {
    document.cookie = `userID=; `;
    document.cookie = `userName=; `;
    setReload((event) => reload + 1);
  };

  const login = () => {
    router.push("/login/loginPage");
  };

  const correction = () => {
    if (cookieOriginal === "" || undefined) {
      return (
        <div className={styles.headerin}>
          <li key="signup" className={styles.lis}>
            <Link href="/signup" className={styles.link}>
              会員登録
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div className={styles.headerin}>
          <li key="signup" className={styles.lis}>
            <Link href="/mypage" className={styles.link}>
              <FontAwesomeIcon icon={faUser} />
              {name}さん
            </Link>
          </li>
        </div>
      );
    }
  };
  return (
    <header>
      <div className={styles.header} />
      <div className={styles.header2}>
        <Link href={"/"} className={styles.titleLink}>
          JORDANS
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
      </div>
    </header>
  );
}
