import type { Stock } from "../types";
import type { FavoriteItem } from "../types";
import Router from "next/router";
import { useCookie } from "./useCookie";
import useSWR, { mutate } from "swr";

const ToggleFavButton = ({ stock }: { stock: Stock }) => {
  const cookieName = useCookie();

  const stockData: FavoriteItem = {
    itemId: stock.id,
    cookieName: cookieName,
    name: stock.item.name,
    price: stock.price,
    size: stock.size,
    imagePath: stock.image1,
    condition: stock.condition,
    deleted: false,
  };

  //自分がお気に入りしたこのstockの配列を取得
  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data, error, mutate } = useSWR(
    `http://localhost:8000/favoriteItems?deleted=false&cookieName=${cookieName}&itemId=${stockData.itemId}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //onClick処理
  const addFav = () => {
    //cookie持ってなかったらログイン画面へ
    if (!cookieName) {
      Router.push("/login/loginPage");
      return;
    }

    alert("お気に入りに追加しました");

    fetch("http://localhost:8000/favoriteItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockData),
    }).then(() => mutate("http://localhost:8000/favoriteItems"));
  };

  const deleteFav = () => {
    //cookie持ってなかったらログイン画面へ
    if (!cookieName) {
      Router.push("/login/loginPage");
      return;
    }
    alert("お気に入りから削除しました");

    fetch(`http://localhost:8000/favoriteItems/${data[0].id}`, {
      method: "DELETE",
    }).then(() => mutate(`http://localhost:8000/favoriteItems/${data[0].id}`));
  };

  return (
    <>
      <div>
        {data.length ? (
          <>
            <input
              type="button"
              onClick={deleteFav}
              className="idbutton"
              value="お気に入りから削除"
            />
          </>
        ) : (
          <>
            <input
              type="button"
              onClick={addFav}
              className="idbutton"
              value="お気に入りに追加"
            />
          </>
        )}
      </div>
    </>
  );
};

export default ToggleFavButton;
