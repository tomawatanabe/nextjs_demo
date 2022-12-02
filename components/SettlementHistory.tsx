import useSWR from "swr";
import React from "react";
import { Order, Stock } from "../types";
import { useCookie } from "./useCookie";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function SettlementHistory() {
  const cookie = useCookie();

  const { data, error } = useSWR(
    `http://localhost:8000/order?userID=${cookie}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  if (!data) {
    return <p>購入履歴はありません</p>;
  } else {
    return (
      <div>
        <h1>購入履歴</h1>
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
            {data.map((order: Order) => {
              const item = order.orderItemList.map((stock: Stock) => {
                return (
                  <>
                    <td>{stock.item.name}</td>
                    <br />
                  </>
                );
              });
              return (
                <tr key={order.id}>
                  <td>{order.orderDate.toString()}</td>
                  <td>{order.status}</td>
                  <td>¥{order.totalPrice}</td>
                  <td>{item}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SettlementHistory;
