import { useState } from "react";
import { useCookie } from "../../components/useCookie";
import useSWR from "swr";
import router from "next/router";
import Link from "next/link";




export default function settlement() {

    const today = new Date();

    // 購入手続き完了でDB/orderに送るデータ内容
    // const [ userID, setUserID] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderDate, setOrderDate] = useState(today);
    const [note, setNote] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    // const [ status, setStatus] = useState("未発送");
    const [products, setProducts] = useState('');
    const userId = useCookie();

    const getdata = {
        // userID: userID,
        totalPrice: totalPrice,
        orderDate: orderDate,
        note: note,
        paymentMethod: paymentMethod
        // orderItemList: orderItemList,
        // status: status,
    };


    // 発送先を表示すため、ユーザー情報を取得するフェッチ
    const cookieName = useCookie();
    const fetcher = (resource: string) =>
        fetch(resource).then((res) => res.json());

    const { data, error } = useSWR(
        `http://localhost:8000/users?id=${cookieName}`,
        fetcher
    );
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;


    // カート情報を出すためのフェッチ


    const fetchproducts = async () => {
        // データを取得
        const response = await fetch(`http://localhost:8000/shoppingCart/${userId}`);
        let products = await response.json();
        // 配列を1つ出力して別の変数に格納
        const productsList = products.map((product: any) =>
            <div>
                <li>{product.stock.item.name} {product.stock.amount} {product.stock.price}</li>
            </div>
        );

        setProducts(productsList)
    };



    // 購入手続きをDBにpostするためのフェッチ
    const send = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        alert("購入手続きが完了しました！");
        fetch('http://localhost:8000/order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(getdata),
        })
            .then((response) => response.json())
            .then((getdata) => {
                console.log('Success:', getdata),
                    router.push('/settlement/');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };




    return (
        <div>
            <h1>購入手続き</h1>
            <h3>お届け先情報</h3>
            <p>氏名: {data[0]?.lastName} {data[0]?.firstName}</p>
            <p>郵便番号: {data[0]?.zipCode}</p>
            <p>住所: {data[0]?.address}</p>
            <p>メールアドレス: {data[0]?.email}</p>
            <p>電話番号: {data[0]?.telephone}</p><br />
            <h3>支払い方法</h3>
            <div>
                <input
                    type="radio"
                    id="credit"
                    name="支払い方法"
                    value="credit"
                    onClick={() => setPaymentMethod("credit")}
                />
                <label htmlFor="credit">クレジット</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="cashOnDelivery"
                    name="支払い方法"
                    value="cashOnDelivery"
                    onClick={() => setPaymentMethod("cashOnDelivery")}
                />
                <label htmlFor="cashOnDelivery">代引き手数料</label>
            </div>

            <h3>購入商品</h3>
            {/* カートの商品を持ってくる */}
            <ul>{products}</ul>
            {/* 商品の合計個数と小計、合計金額を出す。代引きを選択された場合代引き手数料を表示するか金額が0→330になるようにする */}
            <b>発送予定日</b>
            <p>購入日から3～5営業日以内に発送いたします</p>
            <form method="post" action="note">
                <input type="hidden" name="totalPrice" value={totalPrice} />
                <input type="hidden" name="hyouka" value={orderDate.toString()} />

                <p>発送先の住所を変更をご希望の際は備考欄にて【郵便番号・住所（建物名・号室）・宛名】をご記入下さい。</p>
                {/* 上記文言は赤字にする */}

                <p>備考欄<br /><textarea name="msg" ></textarea></p>
                <div>
                    <Link href="">カートに戻る</Link>
                </div>
                <div>
                    <button onClick={send}>購入する</button>
                </div>
            </form><br /><br />
        </div>
    );
}
