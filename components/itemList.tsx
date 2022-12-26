import Link from "next/link";
import useSWR from "swr";
import { Stock } from "../types";
import Image from "next/image";
import styles from "../styles/itemList.module.css";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";
import PagingList from "./paging/paging";

const fetcher = async (key: string, page: number, limit: number) => {
  const start = limit * (page - 1);
  const end = start + limit - 1;
  const { data } = await supabase.from(key).select(`*, items("*")`).range(start, end);
  return data;
};

export default function ItemList(props: any) {
  // 1ページの商品数
  const limit = 15;

  // 現在のページ
  const [page, setPage] = useState(1);
  
  // 商品数の合計
  const [total, setTotal] = useState(0);

  // 1ページ分の商品を取得
  const { data: stocks, error } = useSWR(["stocks", page, limit], fetcher);
  
  // ページング番号を表示するため、最初にsupabaseのstocksを全て持ってくる
  useEffect(() => {
    const getAllData = async() => {
      const res = await fetch(`/api/getStock`);
      const allData = await res.json();
      setTotal(allData.length);
    } 
    getAllData();
  }, [])
  
  // ページの番号(1,2,3・・・)をクリックした時の動作
  const handlePage = (page: number) => {
    setPage(page);
  }

  if (error) return <div>failed to load</div>;
  if (!stocks) return <div>loading...</div>;
  
  return (
    <>
      {stocks.map((stock: any) => {
        return (
            <div className={styles.itemdiv} key={`image${stock.id}`}>
              <Link legacyBehavior href={`/${stock.id}`} key={stock.id}>
                <div className={styles.images} key={stock.items.name}>
                  <Image
                    src={`/${stock.image1}`}
                    alt="item"
                    width={140}
                    height={140}
                    className={styles.image}
                    key={stock.id}
                    priority
                  />
                </div>
              </Link>
              <br />
              <Link legacyBehavior href={`/${stock.id}`} key={`name${stock.id}`}>
                {stock.items.name}
              </Link>
              <br />￥{stock.price}
              <br />
              size {stock.size}
            </div>
        );
      })}
      <div>
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev 
          </button>
          <PagingList dataTotal={total} handlePage={handlePage} limit={limit} />          
          <button onClick={() => setPage(page + 1)} disabled={page === Math.ceil(total / limit)} >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
