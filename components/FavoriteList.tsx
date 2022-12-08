import useSWR from "swr";
import { FavoriteItem2 } from "../types";
import Image from "next/image";
import { useCookie } from "./useCookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/MyPage.module.css";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function FavoriteList() {
  const cookieName = useCookie();
  const [flag, setFlag] = useState(true);
  const router: any = useRouter();

  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/favoriteItems?deleted=false&cookieName=${cookieName}`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //idの降順で並び替える
  const sortedData = data.sort((a: FavoriteItem2, b: FavoriteItem2) => {
    return a.id < b.id ? 1 : -1;
  });

  //降順のTop3を抽出した配列を定義
  const sortTopData = () => {
    const sortedTopData = [];
    for (let i = 0; i < 3; i++) {
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

  //お気に入りから削除する関数
  const deleteFav = (favoriteItem: FavoriteItem2) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API}/api/favoriteItems/${favoriteItem?.id}`,
      {
        method: "DELETE",
      }
    ).then(router.reload());
  };

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
              <Image
                className={styles.btn}
                src="/images/angles-down-solid.svg"
                alt="アコーディオンを開く"
                width={20}
                height={20}
                onClick={() => setFlag(!flag)}
              />
            </>
          ) : (
            <>
              <Image
                className={styles.btn}
                src="/images/angles-up-solid.svg"
                alt="アコーディオンを閉じる"
                width={20}
                height={20}
                onClick={() => setFlag(!flag)}
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
            {flag ? (
              <>
                {sortedTopData.map((favoriteItem: FavoriteItem2) => {
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
                          <Image
                            className={styles.btn}
                            src="/images/new_window.png"
                            alt="詳細ページにジャンプするボタン"
                            width={20}
                            height={20}
                          />
                        </a>
                      </td>
                      <td>
                        <Image
                          className={styles.btn}
                          src="/images/trashbox.png"
                          alt="削除ボタン"
                          width={30}
                          height={30}
                          onClick={() => deleteFav(favoriteItem)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                {sortedData.map((favoriteItem: FavoriteItem2) => {
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
                          <Image
                            className={styles.btn}
                            src="/images/new_window.png"
                            alt="詳細ページにジャンプするボタン"
                            width={20}
                            height={20}
                          />
                        </a>
                      </td>
                      <td>
                        <Image
                          className={styles.myPageDeleteBtn}
                          src="/images/trashbox.png"
                          alt="削除ボタン"
                          width={30}
                          height={30}
                          onClick={() => deleteFav(favoriteItem)}
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
