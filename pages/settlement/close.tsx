import Link from "next/link";
import Header from "../../components/Header";

export default function Close() {


    return (
        <div>
            <Header />
            <p>購入手続きが完了しました！</p>
            <Link href='/'>トップページにに戻る</Link>
        </div>
    );
}
