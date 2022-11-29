import Link from "next/link";
import useSWR from "swr";
import { Stock } from "../types";
import Image from "next/image";
import styles from "../styles/ItemList.module.css";

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemList(props: any) {
  const { data, error } = useSWR("/api/stock", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(props.searchQuery);
  return (
    <>
      {props.searchQuery.map((stock: Stock) => {
        return (
          <div>
            <Link legacyBehavior href={`/${stock.id}`}>
              <Image
                src={`/${stock.image1}`}
                alt="item"
                width={140}
                height={140}
              />
            </Link>
            <br />
            <Link legacyBehavior href={`/${stock.id}`}>
              {stock.item.name}
            </Link>
            <br />￥{stock.price}
          </div>
        );
      })}
    </>
  );
}
