import { useState } from "react";
import { useCookie } from "../../components/useCookie";
import useSWR from "swr";
import router from "next/router";
import Link from "next/link";
import Address from "../../components/settlement/adress";
import CartTotal from "../../components/cart/cartTotal";
import Image from "next/image";



export default function settlement() {

    const today = new Date();

    // 購入手続き完了でDB/orderに送るデータ内容
    // const [ userID, setUserID] = useState(0);
    const [orderDate, setOrderDate] = useState(today);
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [ shipStatus, setShipStatus] = useState("未発送");
    const [flag, setFlag] = useState(false);
    const userId = useCookie();




    // カート情報を出すためのフェッチ
    const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
        fetch(resource, init).then((res) => res.json());
    const { data, error } = useSWR(
        `http://localhost:8000/shoppingCart?id=${userId}`,
        fetcher
    );
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    const ItemList = data;

 

    const getdata = {
        userID: userId,
        // totalPrice: totalPrice,
        orderDate: orderDate,
        note: note,
        paymentMethod: paymentMethod,
        orderItemList: ItemList,
        shipStatus: shipStatus,
    };

    // 購入手続きをDBにpostするためのフェッチ
    const sendOrder = () => {
        if (!paymentMethod) {
            setFlag(true)
            return
        } else {

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
                        router.push('/');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    const handleClick = (event: { target: any; }) => {
        console.log(event.target);

        sendOrder();
        setShipStatus("未発送");

    };

    return (
        <div>
            <Address />
            <h3>支払い方法</h3>
            <div>
                <input
                    type="radio"
                    id="credit"
                    name="支払い方法"
                    value="credit"
                    required
                    onClick={() => setPaymentMethod("credit")}
                />
                <label htmlFor="credit">クレジット</label>
                <input
                    type="radio"
                    id="cashOnDelivery"
                    name="支払い方法"
                    value="cashOnDelivery"
                    onClick={() => setPaymentMethod("cashOnDelivery")}
                />
                <label htmlFor="cashOnDelivery">代引き手数料</label>
            </div>
            {flag && <p>支払い方法を選択してください</p>}

            <h3>購入商品</h3>
            {/* カートの商品を持ってくる */}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>商品名</th>
                            <th>個数</th>
                            <th>価格</th>
                            <th>画像</th>
                            <th>コンディション</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data[0]?.stock.map((Item: any) => {
                            return (
                                <tr key={Item.itemId}>
                                    <td>{Item.item.name}</td>
                                    <td>{Item.amount}</td>
                                    <td>¥{Item.price}</td>
                                    <td>
                                        <Image
                                            src={`/${Item.image1}`}
                                            height={150}
                                            width={150}
                                            alt={Item.item.name}
                                        />
                                        <br />
                                    </td>
                                    <td>{Item.condition}</td>
                                    <td>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* <table> */}
                {/* <tbody>
                        <tr>
                            <th>小計{'('}税込{')'}:</th>
                            <td>￥{totalPrice}</td>
                        </tr>
                        <tr>
                            <th>送料{'('}一律{')'}:</th>
                            <td>￥{cartItems.length ? 500 : 0}</td>
                        </tr>
                    </tbody>
                </table>
                <p><b> 合計</b>：￥{cartItems.length ? totalPrice + 500 : 0}</p> */}
            </div><br />
            <p></p>
            {/* 商品の合計個数と小計、合計金額を出す。代引きを選択された場合代引き手数料を表示するか金額が0→330になるようにする */}
            <b>発送予定日</b>
            <p>購入日から3～5営業日以内に発送いたします</p>
            <form method="post" >
                {/* <input type="hidden" name="totalPrice" value={totalPrice} /> */}
                <input type="hidden" name="shipstatus" value={shipStatus}/>
                <input type="hidden" name="hyouka" value={orderDate.toDateString()} />
                <p>発送先の住所を変更をご希望の際は備考欄にて【郵便番号・住所（建物名・号室）・宛名】をご記入下さい。</p>
                {/* 上記文言は赤字にする */}

                <p>備考欄<br /><textarea name="msg" onChange={(e) => setNote(e.target.value)} value={note} ></textarea></p>
                <div>
                    <Link href="/cart">カートに戻る</Link>
                </div>
                <div>
                    <input type="button" onClick={handleClick} value= "購入する" />
                </div>
            </form><br /><br />
        </div>
    );
}
