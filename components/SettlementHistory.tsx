import useSWR from "swr";
import React, { useState } from "react";
import { Order, Stock } from "../types";
import { useCookie } from "./useCookie";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function SettlementHistory() {
  const cookie = useCookie();
  const [flag, setFlag] = useState(true);

  const { data, error } = useSWR(
    `http://localhost:8000/order?userID=${cookie}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //idの降順で並び替える
  const sortedData = data.sort((a: Order, b: Order) => {
    return a.id < b.id ? 1 : -1;
  });

  //降順のTop3を抽出した配列を定義
  const sortTopData = () => {
    const sortedTopData = [];
    for (let i = 0; i < 3; i++) {
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
        <h2>購入履歴</h2>
        {flag ? (
          <>
            <input
              type="button"
              value="全て表示する"
              onClick={() => setFlag(!flag)}
            />
          </>
        ) : (
          <>
            <input
              type="button"
              value="最近のみ表示する"
              onClick={() => setFlag(!flag)}
            />
          </>
        )}
        <table>
          <thead>
            <tr>
              <th>購入日</th>
              <th>発送状況</th>
              <th>合計金額</th>
              <th>購入商品</th>
            </tr>
          </thead>
          <tbody>
            {flag ? (
              <>
                {sortedTopData.map((order: Order) => {
                  const item = order.orderItemList.map((stock: Stock) => {
                    return (
                      <>
                        {stock.item.name} <br />
                      </>
                    );
                  });

                  return (
                    <tr key={order.id}>
                      <td>{order.orderDate.toString()}</td>
                      <td>{order.shipStatus}</td>
                      <td>¥{order.totalPrice}</td>
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
                        {stock.item.name}
                        <br />
                      </>
                    );
                  });

                  return (
                    <tr key={order.id}>
                      <td>{order.orderDate.toString()}</td>
                      <td>{order.shipStatus}</td>
                      <td>¥{order.totalPrice}</td>
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
