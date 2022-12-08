import Link from "next/link";
import useSWR from "swr";
import { Stock } from "../types";
import Image from "next/image";
import styles from "../styles/itemList.module.css";

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemList(props: any) {
  const { data, error } = useSWR("/api/stock", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      {props.searchQuery.map((stock: Stock) => {
        return (
          <div className={styles.itemdiv} key={`image${stock.id}`}>
            <Link legacyBehavior href={`/${stock.id}`} key={stock.id}>
              <div className={styles.images} key={stock.item.name}>
                <Image
                  src={`/${stock.image1}`}
                  alt="item"
                  layout="fill"
                  className={styles.image}
                  key={stock.id}
                />
              </div>
            </Link>
            <br />
            <Link legacyBehavior href={`/${stock.id}`} key={`name${stock.id}`}>
              {stock.item.name}
            </Link>
            <br />￥{stock.price}
            <br />
            size {stock.size}
          </div>
        );
      })}
    </>
  );
}
