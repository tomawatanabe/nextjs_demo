import type { Item, Stock } from "../types";
import Router from "next/router";
import { useCookie } from "./useCookie";
import useSWR from "swr";
import styles from "../styles/FavButton.module.css";

const ToggleFavButton = ({ stock, item }: { stock: Stock; item: Item }) => {
  const cookieName = useCookie();

  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/favorite/${stock.id}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //onClick処理
  const addFav = async () => {
    //cookie持ってなかったらログイン画面へ
    if (!cookieName) {
      Router.push("/login/loginPage");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API}/api/favorite/${stock.id}`, {
      method: "POST",
    }).then(() => {
      mutate(`${process.env.NEXT_PUBLIC_API}/api/favorite/${stock.id}`);
    });
  };

  const deleteFav = async () => {
    //cookie持ってなかったらログイン画面へ
    if (!cookieName) {
      Router.push("/login/loginPage");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API}/api/favorite/${stock.id}`, {
      method: "DELETE",
    }).then(() => {
      mutate(`${process.env.NEXT_PUBLIC_API}/api/favorite/${stock.id}`);
    });
  };

  return (
    <>
      <div>
        {data.length ? (
          <>
            <input
              type="button"
              onClick={deleteFav}
              className={styles.deleteFavBtn}
              value="お気に入りから削除"
            />
          </>
        ) : (
          <>
            <input
              type="button"
              onClick={addFav}
              className={styles.addFavBtn}
              value="お気に入りに追加"
            />
          </>
        )}
      </div>
    </>
  );
};

export default ToggleFavButton;
