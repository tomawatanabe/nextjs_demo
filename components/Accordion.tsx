import useSWR from "swr";
import { useCookie } from "./useCookie";
import { UsedItems, TopUsedItems } from "../types";
import { useState } from "react";
import styles from "../styles/MyPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp, faAnglesDown } from "@fortawesome/free-solid-svg-icons";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

const Accordion = (props:any) => {
  const cookieName = useCookie();
  const [flag, setFlag] = useState(true);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/usedItems?cookieName=${cookieName}`,

    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //idの降順で並び替える
  const sortedData = data.sort((a: UsedItems, b: UsedItems) => {
    return a.id < b.id ? 1 : -1;
  });

  //降順のTop3を抽出した配列を定義
  const sortTopData = () => {
    const sortedTopData = [];
    for (let i = 0; i < 2; i++) {
      if (typeof sortedData[i]?.itemName === "undefined") {
        break;
      }

      sortedTopData.push({
        receptionDate: sortedData[i]?.receptionDate,
        itemStatus: sortedData[i]?.itemStatus,
        itemName: sortedData[i]?.itemName,
        itemCode: sortedData[i]?.itemCode,
        itemSize: sortedData[i]?.itemSize,
        itemColor: sortedData[i]?.itemColor,
        id: sortedData[i]?.id,
      });
    }
    return sortedTopData;
  };
  const sortedTopData = sortTopData();

  if (!data.length) {
    return (
      <>
        <h2>買取受付</h2>
        <p>買取受付はありません</p>
      </>
    );
  } else {
    return (
      <div>
        <div className={styles.title_wrapper}>
          <h2 className={styles.content_title}>買取受付状況</h2>
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
                      <td className={styles.td_center}>
                        {usedItem.itemStatus}
                      </td>
                      <td className={styles.td_center}>
                        {usedItem.receptionDate}
                      </td>
                      <td>{usedItem.itemName}</td>
                      <td className={styles.td_center}>{usedItem.itemCode}</td>
                      <td className={styles.td_center}>{usedItem.itemSize}</td>
                      <td className={styles.td_center}>{usedItem.itemColor}</td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {sortedData.map((usedItem: UsedItems) => {
                  return (
                    <tr key={usedItem.id}>
                      <td className={styles.td_center}>
                        {usedItem.itemStatus}
                      </td>
                      <td className={styles.td_center}>
                        {usedItem.receptionDate}
                      </td>
                      <td>{usedItem.itemName}</td>
                      <td className={styles.td_center}>{usedItem.itemCode}</td>
                      <td className={styles.td_center}>{usedItem.itemSize}</td>
                      <td className={styles.td_center}>{usedItem.itemColor}</td>
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
};

export default Accordion;
