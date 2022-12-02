import type { Stock } from "../types";
import type { FavoriteItem } from "../types";
import Router from "next/router";
import { useCookie } from "./useCookie";
import { useState } from "react";
import useSWR from "swr";

const AddFavorit = ({ stock }: { stock: Stock }) => {
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

  const { data, error } = useSWR(
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
    if (data.length) {
      alert("既にお気に入り済みです");
    } else {
      fetch("http://localhost:8000/favoriteItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockData),
      });

      alert("お気に入りに追加しました");
    }
  };

  const deleteFav = () => {
    fetch(`http://localhost:8000/favoriteItems/${data[0].id}`, {
      method: "DELETE",
    });
    alert("お気に入りから削除しました");
  };

  return (
    <>
      <div>
        {/* ここdata.lengthじゃなくてflagにすると何故か動かない */}
        {/* {data.length ? (
          <>
            <input
              type="button"
              onClick={sendFavo}
              value="お気に入りから削除"
            />
          </>
        ) : (
          <>
            <input type="button" onClick={sendFavo} value="お気に入りに追加" />
          </>
        )} */}
        <input type="buuton" value="お気に入りにする" onClick={addFav} />
        <input
          type="buuton"
          value="お気に入りから削除する"
          onClick={deleteFav}
        />
      </div>
    </>
  );
};

export default AddFavorit;
