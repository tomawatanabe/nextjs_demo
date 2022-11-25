import Link from 'next/link';
import styles from '../styles/Home.module.css'
import Image from 'next/image';

export default function Header() {
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
            <Link href="/">ログアウト</Link>
          </li>
        </ul>
        {/* 検索ボックスここにいれる */}
        </header>
    </div>
  );
}
