import useSWR from "swr";
import { useCookie } from "./useCookie";
import { UsedItems, TopUsedItems } from "../types";
import { useState } from "react";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function UsedItemList() {
  const cookieName = useCookie();
  const [flag, setFlag] = useState(false);

  const { data, error } = useSWR(
    `http://localhost:8000/usedItems?cookieName=${cookieName}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //idの降順で並び替える
  const sortedData = data.sort((a: UsedItems, b: UsedItems) => {
    return a.id < b.id ? 1 : -1;
  });

  //降順のTop3を抽出
  const sortTopData = () => {
    const sortedTopData = [];
    for (let i = 0; i < 3; i++) {
      sortedTopData.push({
        receptionDate: sortedData[i]?.receptionDate,
        itemStatus: sortedData[i]?.itemStatus,
        itemName: sortedData[i]?.itemName,
        itemCode: sortedData[i]?.itemCode,
        itemSize: sortedData[i]?.itemSize,
        itemColor: sortedData[i]?.itemColor,
        id: sortedData[i]?.itemId,
      });
    }
    return sortedTopData;
  };
  const sortedTopData = sortTopData();

  return (
    <div>
      <h2>買取受付状況</h2>
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
            <th>受付状況</th>
            <th>受付日</th>
            <th>品名</th>
            <th>品番</th>
            <th>サイズ</th>
            <th>色</th>
          </tr>
        </thead>
        <tbody>
          {flag ? (
            <>
              {sortedTopData.map((usedItem: TopUsedItems) => {
                return (
                  <tr key={usedItem.id}>
                    <td>{usedItem.itemStatus}</td>
                    <td>{usedItem.receptionDate}</td>
                    <td>{usedItem.itemName}</td>
                    <td>{usedItem.itemCode}</td>
                    <td>{usedItem.itemSize}</td>
                    <td>{usedItem.itemColor}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              {sortedData.map((usedItem: UsedItems) => {
                return (
                  <tr key={usedItem.id}>
                    <td>{usedItem.itemStatus}</td>
                    <td>{usedItem.receptionDate}</td>
                    <td>{usedItem.itemName}</td>
                    <td>{usedItem.itemCode}</td>
                    <td>{usedItem.itemSize}</td>
                    <td>{usedItem.itemColor}</td>
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

export default UsedItemList;
