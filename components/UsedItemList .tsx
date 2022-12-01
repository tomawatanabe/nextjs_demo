import useSWR from "swr";
import { useCookie } from "./useCookie";
import { UsedItems } from "../types";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function UsedItemList() {
  const cookieName = useCookie();

  const { data, error } = useSWR(
    `http://localhost:8000/usedItems?cookieName=${cookieName}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <h2>買取受付状況</h2>
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
          {data.map((usedItem: UsedItems) => {
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
        </tbody>
      </table>
    </div>
  );
}

export default UsedItemList;
