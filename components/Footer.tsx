import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.left}>
        <ul className={styles.ultag}>
          <li key={"purchase"} className={styles.litag}>
            <Link href="http://localhost:3000/purchase">買取受付</Link>
          </li>
          <li key={"inquiry"} className={styles.litag}>
            <Link href="http://localhost:3000/contact">お問い合わせ</Link>
          </li>
        </ul>
        <div className={styles.images}>
          <Image
            src="/images/FacebookLogo.png"
            alt="FBLogo"
            width={30}
            height={30}
            className={styles.image}
          />

          <Image
            src="/images/InstagramLogo.png"
            alt="InstLogo"
            width={30}
            height={30}
            className={styles.image}
          />
          <Image
            src="/images/TwitterLogo.png"
            alt="TwLogo"
            width={30}
            height={30}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.right}>
        <h3 className={styles.h3tag}>- 運営会社 -</h3>
        <p className={styles.ptag}>
          株式会社JORDANS
          <br />
          〒160-0022 <br />
          東京都新宿区新宿2-5-12 FORECAST新宿AVENUE8階
          <br />
          MAIL : jordans@rakus-partners.co.jp
          <br />
        </p>
      </div>
    </footer>
  );
}
