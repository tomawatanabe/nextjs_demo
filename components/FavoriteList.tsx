import useSWR from "swr";
import { FavoriteItem2 } from "../types";
import Image from "next/image";
import { useCookie } from "./useCookie";
import { useRouter } from "next/router";
import Link from "next/link";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());

function FavoriteList() {
  const cookieName = useCookie();
  const router: any = useRouter();

  const { data, error, mutate } = useSWR(
    `http://localhost:8000/favoriteItems?deleted=false&cookieName=${cookieName}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const deleteFav = (favoriteItem: FavoriteItem2) => {
    fetch(`http://localhost:8000/favoriteItems/${favoriteItem?.id}`, {
      method: "DELETE",
    }).then(router.reload());
  };

  return (
    <div>
      <h2>お気に入り商品</h2>
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
          {data.map((favoriteItem: FavoriteItem2) => {
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
                  <Link href={`http://localhost:3000/${favoriteItem.itemId}`}>
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
        </tbody>
      </table>
    </div>
  );
}

export default FavoriteList;
