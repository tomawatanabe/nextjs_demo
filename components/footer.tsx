import Link from 'next/link';
import Image from 'next/image';

export default function Footer(){
    return(
        <footer>
        <li key={'login'}>
            <Link href='/'>ログイン</Link>
        </li>
        <li key={'purchase'}>
            <Link href='/'>買取受付</Link>
        </li>
        <li key={'inquiry'}>
            <Link href='/'>お問い合わせ</Link>
        </li>
        <Image src='../images/Facebookロゴ.png' alt='FBロゴ' />
        <Image src='../images/Instagramロゴ.png' alt='Instロゴ' />
        <Image src='../images/Twitter.png' alt='Twロゴ' />
        <p>
            運営会社<br />
            株式会社JORDANS<br />
            〒160-0022<br />
            東京都新宿区新宿2-5-12 FORECAST新宿AVENUE8階<br />
            MAIL : jordans@rakus-partners.co.jp<br />
        </p>
        </footer>
    )
}
