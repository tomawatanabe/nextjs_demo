import Image from "next/image";
import { supabase } from "../lib/supabase-client";
import CartButton from "../components/cart/cartButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Item, Stock } from "../types";
import ToggleFavButton from "../components/ToggleFavButton";
import PageTop from "../components/pageTop";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

export const getStaticPaths = async () => {
  const { data, error } = await supabase.from("stocks").select();
  if (!data) return;
  if (error) {
    console.log(error);
  }
  const stocks = await data;
  const getpaths = stocks.map((stock: { id: number }) => {
    return { params: { id: stock.id.toString() } };
  });
  return {
    paths: getpaths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from("stocks")
    .select()
    .eq("id", `${params.id}`);

  if (!data) return;

  if (error) {
    console.log(error);
  }
  const stock = await data[0];

  const items = await supabase.from("items").select().eq("id", `${params.id}`);
  if (!items.data) return;
  const item = await items.data[0];

  return { props: { stock, item } };
}

export default function Detail({ stock, item }: { stock: Stock; item: Item }) {
  return (
    <div>
      <Header />
      <div className="outside">
        <div className="top-wrapper">
          <h1>{item.name}</h1>
          <p>年代：{item.year}年代</p>
          <p>色：{item.color}</p>
        </div>
        <div className="main-content">
          <div className="image-wrapper">
            <div className="splide">
              <Splide
                aria-label="商品詳細画像"
                options={{
                  autoplay: true, // 自動再生を有効
                  interval: 4000, // 自動再生の間隔を3秒に設定
                  height: 500,
                  width: 600,
                  rewind: true,
                  rewindSpeed: 1000,
                  paginationKeyboard: true,
                }}
              >
                <SplideSlide className="splide-container">
                  <Image
                    src={`/${stock.image1}`}
                    height={300}
                    width={400}
                    alt={item.name}
                    priority
                  />
                </SplideSlide>
                <SplideSlide className="splide-container">
                  <Image
                    className="sub-image"
                    src={`/${stock.image2}`}
                    height={300}
                    width={400}
                    alt={item.name}
                    priority
                  />
                </SplideSlide>
                <SplideSlide className="splide-container">
                  <Image
                    className="sub-image"
                    src={`/${stock.image3}`}
                    height={300}
                    width={400}
                    alt={item.name}
                    priority
                  />
                </SplideSlide>
                <SplideSlide className="splide-container">
                  <Image
                    className="sub-image"
                    src={`/${stock.image4}`}
                    height={300}
                    width={400}
                    alt={item.name}
                    priority
                  />
                </SplideSlide>
                <SplideSlide className="splide-container">
                  <Image
                    className="sub-image"
                    src={`/${stock.image5}`}
                    height={300}
                    width={400}
                    alt={item.name}
                    priority
                  />
                </SplideSlide>
              </Splide>

              {/* 画像の高さを揃えて表示させるために以下スタイルを適用 */}
              <style jsx>{`
                .slide-img {
                  display: block;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              `}</style>
            </div>
          </div>
          <div className="right-side-wrapper">
            <div className="right-side-colored">
              <dl>
                <dt>価格（税込）</dt>
                <dd>¥{stock.price}</dd>
              </dl>
              <dl>
                <dt>サイズ</dt>
                <dd>{stock.size}cm</dd>
              </dl>
              <dl>
                <dt>在庫数</dt>
                <dd>{stock.amount}</dd>
              </dl>
              <dl>
                <dt>コンディション</dt>
                <dd>{stock.condition}</dd>
              </dl>
            </div>
            <ToggleFavButton stock={stock} item={item} />
            {/* <CartButton stock={stock,item} /> */}
          </div>
        </div>
        <div className="explanation-wrapper">
          <h2>商品説明</h2>
          <p className="explanation">{item.description}</p>
        </div>
      </div>
      <PageTop />
      <Footer />
    </div>
  );
}
