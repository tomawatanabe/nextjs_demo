import useSWR from "swr";
import { useState } from "react";
import styles from "../../styles/MyPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp, faAnglesDown } from "@fortawesome/free-solid-svg-icons";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function UsedItemList() {
  const [flag, setFlag] = useState(false);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/myPage/getUsedItems`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
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
        receptionDate: data[i]?.reception_date,
        name: data[i]?.item_name,
        status: data[i]?.status,
        size: data[i]?.item_size,
        color: data[i]?.item_color,
        code: data[i]?.item_code,
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
        receptionDate: data[i]?.reception_date,
        name: data[i]?.item_name,
        status: data[i]?.status,
        size: data[i]?.item_size,
        color: data[i]?.item_color,
        code: data[i]?.item_code,
      });
    }
    return restData;
  };

  const restData = createRestData();

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
                icon={faAnglesUp}
                onClick={() => setFlag(!flag)}
                className={styles.btn}
              />
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faAnglesDown}
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
              <th className={styles.th_name}>品名</th>
              <th className={styles.th_ui_size}>品番</th>
              <th className={styles.th_ui_size}>サイズ</th>
              <th>色</th>
            </tr>
          </thead>
          <tbody>
            {topData?.map((usedItem) => {
              return (
                <tr key={usedItem.id}>
                  <td className={styles.td_center}>{usedItem.status}</td>
                  <td className={styles.td_center}>{usedItem.receptionDate}</td>
                  <td>{usedItem.name}</td>
                  <td className={styles.td_center}>{usedItem.code}</td>
                  <td className={styles.td_center}>{usedItem.size}</td>
                  <td className={styles.td_center}>{usedItem.color}</td>
                </tr>
              );
            })}

            {flag && (
              <>
                {restData?.map((usedItem) => {
                  return (
                    <tr key={usedItem.id}>
                      <td className={styles.td_center}>{usedItem.status}</td>
                      <td className={styles.td_center}>
                        {usedItem.receptionDate}
                      </td>
                      <td>{usedItem.name}</td>
                      <td className={styles.td_center}>{usedItem.code}</td>
                      <td className={styles.td_center}>{usedItem.size}</td>
                      <td className={styles.td_center}>{usedItem.color}</td>
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

export default UsedItemList;
