import { FavoriteItem, FavoriteItem2 } from "../types";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/MyPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faAnglesDown,
  faArrowUpRightFromSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../lib/supabase-client";
import useSWR from "swr";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) =>
    res.json().then((res) =>
      res.sort((a: FavoriteItem, b: FavoriteItem) => {
        return a.id < b.id ? 1 : -1;
      })
    )
  );

function FavoriteList() {
  const [flag, setFlag] = useState(false);

  const {
    data: sortedData,
    error,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_API}/api/getFavoriteItems`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!sortedData) return <div>loading...</div>;

  //Top2を抽出した配列を定義
  const sortTopData = () => {
    const sortedTopData = [];
    if (sortedData === undefined) {
      return;
    }

    for (let i = 0; i < 2; i++) {
      if (typeof sortedData[i]?.name === "undefined") {
        break;
      }

      sortedTopData.push({
        name: sortedData[i]?.name,
        condition: sortedData[i]?.condition,
        imagePath: sortedData[i]?.imagePath,
        size: sortedData[i]?.size,
        price: sortedData[i]?.price,
        itemId: sortedData[i]?.itemId,
        cookieName: sortedData[i]?.cookieName,
        id: sortedData[i]?.id,
      });
    }
    return sortedTopData;
  };

  const sortedTopData = sortTopData();

  //Top2から漏れた配列を定義
  const sortRestData = () => {
    const sortedRestData = [];
    if (sortedData === undefined) {
      return;
    }
    for (let i = 2; i < sortedData.length; i++) {
      if (typeof sortedData[i]?.name === "undefined") {
        break;
      }

      sortedRestData.push({
        name: sortedData[i]?.name,
        condition: sortedData[i]?.condition,
        imagePath: sortedData[i]?.imagePath,
        size: sortedData[i]?.size,
        price: sortedData[i]?.price,
        itemId: sortedData[i]?.itemId,
        cookieName: sortedData[i]?.cookieName,
        id: sortedData[i]?.id,
      });
    }
    return sortedRestData;
  };

  const sortedRestData = sortRestData();

  if (!sortedData.length) {
    return (
      <>
        <h2>お気に入り</h2>
        <p>お気に入りはありません</p>
      </>
    );
  } else {
    return (
      <div>
        <div className={styles.title_wrapper}>
          <h2 className={styles.content_title}>お気に入り</h2>
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
              <th>商品名</th>
              <th>価格</th>
              <th className={styles.th_size}>サイズ</th>
              <th>画像</th>
              <th>コンディション</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedTopData?.map((favoriteItem: FavoriteItem2) => {
              return (
                <tr key={favoriteItem.itemId}>
                  <td>{favoriteItem.name}</td>
                  <td>¥{favoriteItem.price.toLocaleString()}</td>
                  <td className={styles.td_center}>{favoriteItem.size}</td>
                  <td>
                    <Image
                      src={`/${favoriteItem.imagePath}`}
                      height={120}
                      width={120}
                      alt={favoriteItem.name}
                      priority
                    />
                    <br />
                  </td>
                  <td className={styles.td_center}>{favoriteItem.condition}</td>
                  <td>
                    <a
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_API}/${favoriteItem.itemId}`}
                    >
                      <FontAwesomeIcon
                        className={styles.btn}
                        icon={faArrowUpRightFromSquare}
                      />
                    </a>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={async () => {
                        const { data, error } = await supabase
                          .from("favorite_items")
                          .delete()
                          .eq("id", favoriteItem?.id);

                        mutate(
                          `${process.env.NEXT_PUBLIC_API}/api/getFavoriteItems`
                        );
                      }}
                      className={styles.btn}
                    />
                  </td>
                </tr>
              );
            })}
            {flag && (
              <>
                {sortedRestData?.map((favoriteItem: FavoriteItem2) => {
                  return (
                    <tr key={favoriteItem.itemId}>
                      <td>{favoriteItem.name}</td>
                      <td>¥{favoriteItem.price.toLocaleString()}</td>
                      <td className={styles.td_center}>{favoriteItem.size}</td>
                      <td>
                        <Image
                          src={`/${favoriteItem.imagePath}`}
                          height={120}
                          width={120}
                          alt={favoriteItem.name}
                          priority
                        />
                        <br />
                      </td>
                      <td className={styles.td_center}>
                        {favoriteItem.condition}
                      </td>
                      <td>
                        <a
                          target="_blank"
                          href={`${process.env.NEXT_PUBLIC_API}/${favoriteItem.itemId}`}
                        >
                          <FontAwesomeIcon
                            className={styles.btn}
                            icon={faArrowUpRightFromSquare}
                          />
                        </a>
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={async () => {
                            const { data, error } = await supabase
                              .from("favorite_items")
                              .delete()
                              .eq("id", favoriteItem?.id);
                            mutate(
                              `${process.env.NEXT_PUBLIC_API}/api/getFavoriteItems`
                            );
                          }}
                          className={styles.btn}
                        />
                      </td>
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

export default FavoriteList;
