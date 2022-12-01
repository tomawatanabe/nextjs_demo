import Image from "next/image";
import Link from "next/link";
import AddFavorit from "../components/addFavorite";
import FavoriteList from "../components/FavoriteList";
import { Stock } from "../types";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:8000/stock");
  const stocks = await res.json();
  const getpaths = stocks.map((stock: { id: any }) => {
    return { params: { id: stock.id.toString() } };
  });
  return {
    paths: getpaths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: { params: any }) {
  const res = await fetch(`http://localhost:8000/stock/${params.id}`);
  const stock = await res.json();

  return { props: { stock } };
}

export default function Detail({ stock }: { stock: Stock }) {
  return (
    <div>
      <h1>{stock.item.name}</h1>
      <div>
        <p>商品名：{stock.item.name}</p>
        <p>詳細：{stock.item.description}</p>
        <p>価格：¥{stock.price}</p>
        <p>年代：{stock.item.year}年代</p>
        <p>サイズ：{stock.size}</p>
        <p>色：{stock.item.color}</p>
        <p>在庫数：{stock.amount}</p>
        <p>コンディション：{stock.condition}</p>
        <Image
          src={`/${stock.image1}`}
          height={200}
          width={200}
          alt={stock.item.name}
          priority
        />
        <br />
        <Image
          src={`/${stock.image2}`}
          height={200}
          width={200}
          alt={stock.item.name}
          priority
        />
        <br />
        <Image
          src={`/${stock.image3}`}
          height={200}
          width={200}
          alt={stock.item.name}
          priority
        />
        <br />
        <Image
          src={`/${stock.image4}`}
          height={200}
          width={200}
          alt={stock.item.name}
          priority
        />
        <br />
        <Image
          src={`/${stock.image5}`}
          height={200}
          width={200}
          alt={stock.item.name}
          priority
        />
        <br />
        <br />
        <AddFavorit stock={stock} />
        <br />
        <Link href="/">商品一覧へ戻る</Link>
        <br />
      </div>
    </div>
  );
}
