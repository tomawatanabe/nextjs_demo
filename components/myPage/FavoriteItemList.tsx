import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/MyPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesUp,
  faAnglesDown,
  faArrowUpRightFromSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../lib/supabase-client";
import useSWR from "swr";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function FavoriteList() {
  const [flag, setFlag] = useState(false);

  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/myPage/getFavoriteItems`,
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
        name: data[i]?.stocks.items.name,
        condition: data[i]?.stocks.condition,
        imagePath: data[i]?.stocks.image1,
        size: data[i]?.stocks.size,
        price: data[i]?.stocks.price,
        itemId: data[i]?.stocks.itemID,
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
        condition: data[i]?.stocks.condition,
        imagePath: data[i]?.stocks.image1,
        size: data[i]?.stocks.size,
        price: data[i]?.stocks.price,
        itemId: data[i]?.stocks.itemID,
      });
    }
    return restData;
  };

  const restData = createRestData();

  if (!data.length) {
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
            {topData?.map((favoriteItem) => {
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
                {restData?.map((favoriteItem) => {
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
