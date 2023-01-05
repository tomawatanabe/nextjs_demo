import { useEffect, useState } from "react";
import { useCookie } from "../../components/useCookie";
import useSWR, { mutate } from "swr";
import router from "next/router";
import Link from "next/link";
import Address from "../../components/settlement/adress";
import Image from "next/image";
import Header from "../../components/Header";
import SignIn from "../../components/SignIn";
import Footer from "../../components/Footer";
import styles from "/styles/Settlement.module.css";
import { ShoppingCart } from "../../types";
import Router from "next/router";

const fetcher = (resource: string): Promise<any> =>
  fetch(resource).then((res) => res.json());

export default function Settlement() {
  // 購入手続き完了でDB/orderに送るデータ内容
  const [note, setNote] = useState("");
  const [payment_method, setPayment_method] = useState("");
  const [shipStatus, setShipStatus] = useState("未発送");
  const [flag, setFlag] = useState(false);

  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const userID = useCookie();

  // カート情報を引き出す
  const { data: itemList } = useSWR(`/api/getCart/${userID}`, fetcher);
  const { data: orderID } = useSWR(`/api/getOrder/${userID}`, fetcher);

  // 合計金額計算
  useEffect(() => {
    setSubTotal(
      itemList
        ?.map((stock: any) => stock.stocks.price)
        .reduce((prev: number, curr: number) => prev + curr, 0)
    );
  }, [itemList]);

  const orderData = [
    {
      note: note,
      payment_method: payment_method,
      user_id: userID,
      ship_status: shipStatus,
      total_price: total,
    },
  ];

  // 購入手続きをDBにpostする
  const sendOrder = () => {
    if (!payment_method) {
      setFlag(true);
      return;
    } else {
      fetch(`/api/getOrder/${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const getItems = () => {
    mutate(`/api/getOrder/${userID}`, fetcher);
    //追加したorderのIDを取得してorderItemsにPOSTする
    for (const post of itemList) {
      const postData = {
        order_id: orderID.id,
        stock_id: post.stock_id,
        user_id: userID,
      };
      fetch(`/api/getOrderItems/${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      // stocksの在庫をなくす(deletedをtrueに変える)
      fetch(`/api/getStocks/${post.stock_id}`, {
        method: "PATCH",
      });
    }
  };

  // カートの中身を削除する
  const DeletedItems = () => {
    fetch(`api/getOrder/${userID}`, {
      method: "DELETE",
    });
  };

  const handleClick = async (event: { target: any }) => {
    sendOrder();
    getItems();
    router.replace(`/settlement/close`);
    DeletedItems();
  };

  return (
    <div>
      <SignIn>
        <Header />
        <div className={styles.outside}>
          <Address />
          <h3 className={styles.content_title}>購入商品</h3>
          <br />
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
              {itemList?.map((Item: ShoppingCart) => {
                return (
                  <tr key={Item.id}>
                    <td>{Item.stocks.items.name}</td>
                    <td>{Item.stocks.amount}</td>
                    <td>¥{Item.stocks.price}</td>
                    <td>
                      <Image
                        src={`/${Item.stocks.image1}`}
                        height={150}
                        width={150}
                        alt={Item.stocks.items.name}
                      />
                      <br />
                    </td>
                    <td className={styles.td_center}>
                      {Item.stocks.condition}
                    </td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br />
          {payment_method === "credit" ? (
            <div className={styles.total_wrapper}>
              <table className="right-side-colored">
                <tbody>
                  <tr className={styles.total_table_list} key="credit">
                    <th>
                      小計{"("}税込{")"}:
                    </th>
                    <td>￥{subTotal}</td>
                  </tr>
                  <tr className={styles.total_table_list}>
                    <th>
                      送料{"("}一律{")"}:
                    </th>
                    <td>￥500</td>
                  </tr>

                  <tr className={styles.total_table_last_list}>
                    <th>
                      合計{"("}税込{")"}:
                    </th>
                    <td>￥{subTotal + 500}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.total_wrapper}>
              <div className="right-side-colored">
                <table>
                  <tbody>
                    <tr className={styles.total_table_list} key="cash">
                      <th>
                        小計{"("}税込{")"}:
                      </th>
                      <td>￥{subTotal}</td>
                    </tr>
                    <tr className={styles.total_table_list}>
                      <th>
                        送料{"("}一律{")"}:
                      </th>
                      <td>￥500</td>
                    </tr>

                    <tr className={styles.total_table_last_list}>
                      <th>
                        合計{"("}税込{")"}:
                      </th>
                      <td>￥{subTotal + 500 + 330}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <b>発送予定日</b>
          <p>購入日から3～5営業日以内に発送いたします</p>
          <form>
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
                onClick={() => {
                  setPayment_method("credit");
                  setTotal(subTotal + 500);
                }}
              />
              <label htmlFor="cashOnDelivery">
                <span className="label-fit label-danger">必須</span>代引き{" "}
                <br />
                *代引き手数料 +￥330
              </label>
              <input
                type="radio"
                id="cashOnDelivery"
                name="支払い方法"
                value="cashOnDelivery"
                onClick={() => {
                  setPayment_method("cashOnDelivery");
                  setTotal(subTotal + 830);
                }}
              />
            </div>
            {flag && (
              <p className={styles.attention}>*支払い方法を選択してください</p>
            )}
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
            </div>
            <br />
            <div className={styles.btn}>
              <input
                type="button"
                className="idbutton"
                onClick={handleClick}
                value="購入する"
              />
            </div>
            <br />
            <div className={styles.btn}>
              <Link href="/cart" className={styles.link}>
                カートに戻る
              </Link>
            </div>
          </form>
          <br />
          <br />
        </div>
        <Footer />
      </SignIn>
    </div>
  );
}
