import useSWR from "swr";
import React, { useState } from "react";
import Image from "next/image";
import { OrderItems, Stock } from "../../types";
import { useCookie } from "../useCookie";
import styles from "../../styles/MyPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp, faAnglesDown } from "@fortawesome/free-solid-svg-icons";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function SettlementHistory() {
  const [flag, setFlag] = useState(true);

  const { data, error } = useSWR(`/api/getOrderItems/orderItems`, fetcher);
  if (error) return <div>購入履歴はありません</div>;
  if (!data) return <div>loading...</div>;



  //Top2を抽出した配列を定義
  const createTopData = () => {
    const topData = [];
    if (data === undefined) {
      return;
    }

    for (let i = 0; i < 2; i++) {
      if (typeof data[i]?.id === "undefined") {
        break;
      }

      topData.push({
        id: data[i]?.id,
        userId: data[i]?.user_id,
        name: data[i]?.stocks.items.name,
        shipStatus: data[i]?.orders.ship_status,
        orderDate: data[i]?.orders.order_date,
        imagePath: data[i]?.stocks.image1,
        totalPrice: data[i]?.orders.total_price,
        itemId: data[i]?.stocks.item_id,
        stocks: data[i]?.stocks,
      });
    }
    return topData;
  };

  const topData = createTopData();

  //Top2から漏れた配列を定義
  const createRestData = () => {
    const restData = [];
    if (data === undefined) {
      return;
    }
    for (let i = 2; i < data.length; i++) {
      if (typeof data[i]?.id === "undefined") {
        break;
      }

      restData.push({
        id: data[i]?.id,
        userId: data[i]?.user_id,
        name: data[i]?.stocks.items.name,
        shipStatus: data[i]?.orders.ship_status,
        orderDate: data[i]?.orders.order_date,
        imagePath: data[i]?.stocks.image1,
        totalPrice: data[i]?.orders.total_price,
        itemId: data[i]?.stocks.item_id,
        stocks: data[i]?.stocks,
      });
    }
    return restData;
  };

  const restData = createRestData();


  if (!data.length) {
    return (
      <>
        <h2>購入履歴</h2>
        <p>購入履歴はありません</p>
      </>
    );
  } else {
    return (
      <div>
        <div className={styles.title_wrapper}>
          <h2 className={styles.content_title}>購入履歴</h2>
          {flag ? (
            <>
              <FontAwesomeIcon
                icon={faAnglesDown}
                onClick={() => setFlag(!flag)}
                className={styles.btn}
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faAnglesUp}
                onClick={() => setFlag(!flag)}
                className={styles.btn}
              />
            </>
          )}
        </div>
        <table className={styles.table_list}>
          <thead>
            <tr>
              <th>商品名</th>
              <th>合計金額</th>
              <th>購入日</th>
              <th>画像</th>
              <th>発送状況</th>
            </tr>
          </thead>
          <tbody>
            {topData?.map((orderItems) => {
              return (
                <tr key={orderItems.itemId}>
                  <td>{orderItems.name}</td>
                  <td className={styles.td_center}>
                    ¥{orderItems.totalPrice.toLocaleString()}
                  </td>
                  <td className={styles.td_center}>{orderItems.orderDate}</td>
                  <td>
                    <Image
                      src={`/${orderItems.imagePath}`}
                      height={120}
                      width={120}
                      alt={orderItems.name}
                      priority
                    />
                    <br />
                  </td>
                  <td className={styles.td_center}>{orderItems.shipStatus}</td>
                </tr>
              );
            })}
            {flag && (
              <>
                {restData?.map((orderItems) => {

                  return (
                    <tr key={orderItems.itemId}>
                      <td>{orderItems.name}</td>
                      <td className={styles.td_center}>
                        ¥{orderItems.totalPrice.toLocaleString()}
                      </td>
                      <td className={styles.td_center}>{orderItems.orderDate}</td>
                      <td>
                        <Image
                          src={`/${orderItems.imagePath}`}
                          height={120}
                          width={120}
                          alt={orderItems.name}
                          priority
                        />
                        <br />
                      </td>
                      <td className={styles.td_center}>{orderItems.shipStatus}</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SettlementHistory;
