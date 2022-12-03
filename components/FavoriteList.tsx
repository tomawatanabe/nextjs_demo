import useSWR from "swr";
import { FavoriteItem2 } from "../types";
import Image from "next/image";
import { useCookie } from "./useCookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function FavoriteList() {
  const cookieName = useCookie();
  const [flag, setFlag] = useState(true);
  const router: any = useRouter();

  const { data, error } = useSWR(
    `http://localhost:8000/favoriteItems?deleted=false&cookieName=${cookieName}`,
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
    fetch(`http://localhost:8000/favoriteItems/${favoriteItem?.id}`, {
      method: "DELETE",
    }).then(router.reload());
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
        <h2>お気に入り商品</h2>
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
              <th>商品名</th>
              <th>価格</th>
              <th>サイズ</th>
              <th>画像</th>
              <th>コンディション</th>
            </tr>
          </thead>
          <tbody>
            {flag ? (
              <>
                {sortedTopData.map((favoriteItem: FavoriteItem2) => {
                  return (
                    <tr key={favoriteItem.itemId}>
                      <td>{favoriteItem.name}</td>
                      <td>¥{favoriteItem.price}</td>
                      <td>{favoriteItem.size}</td>
                      <td>
                        <Image
                          src={`/${favoriteItem.imagePath}`}
                          height={150}
                          width={150}
                          alt={favoriteItem.name}
                          priority
                        />
                        <br />
                      </td>
                      <td>{favoriteItem.condition}</td>
                      <td>
                        <Link
                          href={`http://localhost:3000/${favoriteItem.itemId}`}
                        >
                          詳細
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => deleteFav(favoriteItem)}>
                          お気に入りから削除
                        </button>
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
                      <td>¥{favoriteItem.price}</td>
                      <td>{favoriteItem.size}</td>
                      <td>
                        <Image
                          src={`/${favoriteItem.imagePath}`}
                          height={150}
                          width={150}
                          alt={favoriteItem.name}
                          priority
                        />
                        <br />
                      </td>
                      <td>{favoriteItem.condition}</td>
                      <td>
                        <Link
                          href={`http://localhost:3000/${favoriteItem.itemId}`}
                        >
                          詳細
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => deleteFav(favoriteItem)}>
                          お気に入りから削除
                        </button>
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
