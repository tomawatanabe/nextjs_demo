import useSWR from "swr";
import React, { useState } from "react";
import { Order, Stock } from "../../types";
import { useCookie } from "../useCookie";
import styles from "../../styles/MyPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp, faAnglesDown } from "@fortawesome/free-solid-svg-icons";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function SettlementHistory() {
  const cookie = useCookie();
  const [flag, setFlag] = useState(true);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/order?userId=${cookie}`,
    fetcher
  );
  if (error) return <div>購入履歴はありません</div>;
  if (!data) return <div>loading...</div>;

  //idの降順で並び替える
  const sortedData = data.sort((a: Order, b: Order) => {
    return a.id < b.id ? 1 : -1;
  });

  //降順のTop3を抽出した配列を定義
  const sortTopData = () => {
    const sortedTopData = [];
    for (let i = 0; i < 3; i++) {
      if (typeof sortedData[i]?.id === "undefined") {
        break;
      }

      sortedTopData.push({
        id: sortedData[i]?.id,
        userId: sortedData[i]?.userId,
        totalPrice: sortedData[i]?.totalPrice,
        orderDate: sortedData[i]?.orderDate,
        note: sortedData[i]?.note,
        paymentMethod: sortedData[i]?.paymaentMethod,
        shipStatus: sortedData[i]?.shipStatus,
        orderItemList: sortedData[i]?.orderItemList,
      });
    }
    return sortedTopData;
  };

  const sortedTopData = sortTopData();

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
              <th>発送状況</th>
              <th>購入日</th>
              <th>合計金額</th>
              <th className={styles.th_name}>購入商品</th>
            </tr>
          </thead>
          <tbody>
            {flag ? (
              <>
                {sortedTopData.map((order: Order) => {
                  const item = order.orderItemList.map((stock: Stock) => {
                    return (
                      <span key={stock.items.id}>
                        ・{stock.items.name} <br />
                      </span>
                    );
                  });

                  return (
                    <tr key={order.id}>
                      <td className={styles.td_center}>{order.shipStatus}</td>
                      <td className={styles.td_center}>{order.orderDate}</td>
                      <td className={styles.td_center}>
                        ¥{order.totalPrice.toLocaleString()}
                      </td>
                      <td>{item}</td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {data.map((order: Order) => {
                  const item = order.orderItemList.map((stock: Stock) => {
                    return (
                      <>
                        ・{stock.items.name}
                        <br />
                      </>
                    );
                  });

                  return (
                    <tr key={order.id}>
                      <td className={styles.td_center}>{order.shipStatus}</td>
                      <td className={styles.td_center}>{order.orderDate}</td>
                      <td className={styles.td_center}>
                        ¥{order.totalPrice.toLocaleString()}
                      </td>
                      <td>{item}</td>
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
