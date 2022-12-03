import Image from "next/image";
import Link from "next/link";
import AddFavorit from "../components/ToggleFavButton";
import FavoriteList from "../components/FavoriteList";
import CartButton from "../components/cart/cartButton";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { Stock } from "../types";
import ToggleFavButton from "../components/ToggleFavButton";

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
      <Header />
      <div>
        <body className="content-wrapper">
          <div className="top-wrapper">
            <h1>{stock.item.name}</h1>
            <div className="sub">
              <h3>YEAR：{stock.item.year}年代</h3>
              <h3>COLOR：{stock.item.color}</h3>
            </div>
          </div>
          <div className="main-content">
            <div className="image-wrapper">
              <div className="main-image">
                <Image
                  src={`/${stock.image1}`}
                  height={200}
                  width={200}
                  alt={stock.item.name}
                  priority
                />
              </div>
              <div className="sub-images">
                <Image
                  className="sub-image"
                  src={`/${stock.image2}`}
                  height={200}
                  width={200}
                  alt={stock.item.name}
                  priority
                />
                <Image
                  className="sub-image"
                  src={`/${stock.image3}`}
                  height={200}
                  width={200}
                  alt={stock.item.name}
                  priority
                />
                <Image
                  className="sub-image"
                  src={`/${stock.image4}`}
                  height={200}
                  width={200}
                  alt={stock.item.name}
                  priority
                />
                <Image
                  className="sub-image"
                  src={`/${stock.image5}`}
                  height={200}
                  width={200}
                  alt={stock.item.name}
                  priority
                />
              </div>
            </div>
            <div className="right-side-wrapper">
              <p>価格：¥{stock.price}</p>
              <p>サイズ：{stock.size}cm</p>
              <p>在庫数：{stock.amount}</p>
              <p>コンディション：{stock.condition}</p>
              <ToggleFavButton stock={stock} />
            </div>
          </div>
          <div className="explanation-wrapper">
            <h2>商品説明</h2>
            <div className="sub description">
              <p>{stock.item.description}</p>
            </div>
          </div>
        </body>
        <Footer />
      </div>
    </div>
  );
}
