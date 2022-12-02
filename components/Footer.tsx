import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <li key={"purchase"}>
        <Link href="/">買取受付</Link>
      </li>
      <li key={"inquiry"}>
        <Link href="/">お問い合わせ</Link>
      </li>
      <Image
        src="/images/FacebookLogo.png"
        alt="FBLogo"
        width={30}
        height={30}
      />
      <Image
        src="/images/InstagramLogo.png"
        alt="InstLogo"
        width={30}
        height={30}
      />
      <Image
        src="/images/TwitterLogo.png"
        alt="TwLogo"
        width={30}
        height={30}
      />
      <p>
        運営会社
        <br />
        株式会社JORDANS
        <br />
        〒160-0022 <br />
        東京都新宿区新宿2-5-12 FORECAST新宿AVENUE8階
        <br />
        MAIL : jordans@rakus-partners.co.jp
        <br />
      </p>
    </footer>
  );
}
