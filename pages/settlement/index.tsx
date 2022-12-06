import { useEffect, useState } from "react";
import { useCookie } from "../../components/useCookie";
import useSWR from "swr";
import router from "next/router";
import Link from "next/link";
import Address from "../../components/settlement/adress";
import Image from "next/image";
import Header from "../../components/Header";
import SignIn from "../../components/SignIn";
import Footer from "../../components/Footer";
import styles from "/styles/Settlement.module.css";




export default function Settlement() {

    
    const today = new Date();
    

    // 購入手続き完了でDB/orderに送るデータ内容
    const [orderDate, setOrderDate] = useState();
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [shipStatus, setShipStatus] = useState("未発送");
    const [flag, setFlag] = useState(false);
    const userId = useCookie();
    




    // カート情報を引き出す
    const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
        fetch(resource, init).then((res) => res.json());
    const { data: cart, error } = useSWR(
        `http://localhost:3000/api/shoppingCart/${userId}`,
        fetcher
    );

    const ItemList = cart?.stock;
    console.log("itemlist", ItemList);

    // 合計金額計算
    const initial: number = ItemList?.map((stock: any) => stock.price).reduce((prev: number, curr: number) => prev + curr, 0);
    console.log(initial);
    const [total, setTotal] = useState(initial);

    useEffect(() => {
        setTotal(initial);
    }, [cart]);

    if (error) return <div>failed to load</div>;
    if (!cart) return <div>loading...</div>;




    const getdata = {
        userID: userId,
        // totalPrice: totalPrice,
        orderDate: orderDate,
        note: note,
        paymentMethod: paymentMethod,
        orderItemList: ItemList,
        shipStatus: shipStatus,

    };

    // 購入手続きをDBにpostする
    const sendOrder = () => {
        if (!paymentMethod) {
            setFlag(true)
            return
        } else {

            fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getdata),
            })
                .then((response) => response.json())
                .then((getdata) => {
                    console.log('Success:', getdata);
                    router.replace('http://localhost:3000/settlement/close');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    // カートの中身を削除する
    const DeletedItems = () => {
        const deletedList: any[] = [];


        fetch(`http://localhost:3000/api/shoppingCart/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "stock": deletedList
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const handleClick = (event: { target: any; }) => {
        console.log(event.target);

        sendOrder();
        setShipStatus("未発送");
        // setOrderDate();
        DeletedItems();
    };

    return (
        <div >
            <SignIn>
                <Header />
                <div className={styles.outside}>

                    <Address />
                    <h3 className={styles.content_title}>購入商品</h3><br />
                    <table className={styles.table_list}>
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
                            {cart?.stock?.map((Item: any) => {
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
                                        <td className={styles.td_center}>{Item.condition}</td>
                                        <td>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table><br />
                    {paymentMethod === "credit" ? (
                        <div className={styles.total_wrapper}>
                            <table className="right-side-colored">
                                <tbody>
                                    <tr className={styles.total_table_list}>
                                        <th>小計{'('}税込{')'}:</th>
                                        <td>￥{total}</td>
                                    </tr>
                                    <tr className={styles.total_table_list}>
                                        <th>送料{'('}一律{')'}:</th>
                                        <td>￥500</td>
                                    </tr>
                                    <tr className={styles.total_table_last_list}>
                                        <th>合計{'('}税込{')'}:</th>
                                        <td>￥{total + 500}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className={styles.total_wrapper}>
                            <div className="right-side-colored">
                                <table>
                                    <tbody >
                                        <tr className={styles.total_table_list}>
                                            <th >小計{'('}税込{')'}:</th>
                                            <td>￥{total}</td>
                                        </tr>
                                        <tr className={styles.total_table_list}>
                                            <th>送料{'('}一律{')'}:</th>
                                            <td>￥500</td>
                                        </tr>
                                        <tr className={styles.total_table_list}>
                                            <th>代引き手数料:</th>
                                            <td>￥330</td>
                                        </tr>
                                        <tr className={styles.total_table_last_list}>
                                            <th>合計{'('}税込{')'}:</th>
                                            <td>￥{total + 500 + 330}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    <b>発送予定日</b>
                    <p>購入日から3～5営業日以内に発送いたします</p>
                    <form >
                        {/* <input type="hidden" name="totalPrice" value={totalPrice} /> */}
                        <input type="hidden" name="shipstatus" value={shipStatus} />
                        <h3>支払い方法</h3>
                        <div>
                            <label htmlFor="credit">
                                <span className="label-fit label-danger">必須</span>クレジット
                            </label>
                            <input
                                type="radio"
                                id="credit"
                                name="支払い方法"
                                value="credit"
                                required
                                onClick={() => setPaymentMethod("credit")}
                            />
                            <label htmlFor="cashOnDelivery">
                                <span className="label-fit label-danger">必須</span>代引き手数料 <br />*代引き手数料 +￥330
                            </label>
                            <input
                                type="radio"
                                id="cashOnDelivery"
                                name="支払い方法"
                                value="cashOnDelivery"
                                onClick={() => setPaymentMethod("cashOnDelivery")}
                            />
                        </div>
                        {flag && <p className={styles.attention}>*支払い方法を選択してください</p>}
                        <br />
                        <p>
                            発送先の住所を変更をご希望の際は備考欄にて【郵便番号・住所（建物名・号室）・宛名】をご記入下さい。
                            <br /> 下記をコピーしてお使いください。
                            <br />
                            ----------------------------
                            <br /> 郵便番号:
                            <br /> 住所（建物名・号室）:
                            <br /> 宛名:
                        </p>
                        <div>
                            <label htmlFor="note">
                                <span className="label-fit label-warning">任意</span>備考
                            </label>
                            <br />
                            <textarea
                                cols={120}
                                rows={15}
                                id="note"
                                placeholder="宛先変更があればご記入ください"
                                onChange={(e) => setNote(e.target.value)}
                                value={note}
                                className={styles.form}
                            />
                        </div><br />
                        <div className={styles.btn}>
                            <input type="button" className="idbutton" onClick={handleClick} value="購入する" />
                        </div><br />
                        <div className={styles.btn}>
                            <Link href="/cart" className={styles.link}>カートに戻る</Link>
                        </div>
                    </form><br /><br />
                </div>
                <Footer />
            </SignIn>
        </div>
    );
}
