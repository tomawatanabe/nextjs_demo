import { supabase } from "../../lib/supabase-client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import stylesItem from "../../styles/itemList.module.css"
import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/sidebar";
import Search from "../../components/Search";
import Footer from "../../components/Footer";
import PageTop from "../../components/pageTop";
import { useState, useEffect } from "react";
import Router from "next/router";
import { Stock } from "../../types";

const Result = ({products}: {products: Stock[]}) => {

  // 検索機能
  const [searchValue, setSearchValue] = useState<string | undefined>("");

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    Router.push({
      pathname: "/products",
      query: {keyword: searchValue}
    });
  };

  // カテゴリ絞り込み機能
  
  const initializedData = {
    notifyFrequency: "",
  };

  const [data, setData] = useState(initializedData);

  const handleFrequencyChange = (e: any) => {
    const newValue =
      e.target.value === data.notifyFrequency ? "" : e.target.value;
    const newData = { ...data, notifyFrequency: newValue };
    setData(newData);

    if (e.target.checked) {
      Router.push({
        pathname: "/series",
        query: {seriesName: newValue}
      })
    }else{
      Router.push("/");
    }
  };

  // 検索条件に一致する商品がある場合
  const itemResult = (
    <div className={stylesItem.gridBox}>
      {products.map((stock: Stock) => {
          return (
              <div className={stylesItem.itemdiv} key={`image${stock.id}`}>
              <Link legacyBehavior href={`/${stock.id}`} key={stock.id}>
                  <div className={stylesItem.images} key={stock.items?.name}>
                  <Image
                      src={`/${stock.image1}`}
                      alt="item"
                      width={140}
                      height={140}
                      className={stylesItem.image}
                      key={stock.id}
                      priority
                  />
                  </div>
              </Link>
              <br />
              <Link legacyBehavior href={`/${stock.id}`} key={`name${stock.id}`}>
                  {stock?.items?.name}
              </Link>
              <br />￥{stock.price}
              <br />
              size {stock.size}
              </div>
          );
      })}
    </div>
  )

  // 検索条件に一致する商品がない場合
  const nonResult = <p style={{textAlign: "center"}}>検索条件に一致する商品はありませんでした。</p>

    return (
        <>
        <div className={styles.container}>
      <Head>
        <title>-JORDANS-中古NIKEスニーカー販売</title>
        <meta name="jordans" content="sneakers NIKE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.mainFlex}>
          <Sidebar
            onClick={handleClick}
            data={data}
            handleFrequencyChange={handleFrequencyChange}
          />
          <div className={styles.main_product}>
            <div className={styles.search}>
              <Search
                onChange={handleSearch}
                onClick={handleClick}
                data={data}
                handleFrequencyChange={handleFrequencyChange}
              />
            </div>
            {products.length? itemResult : nonResult}
            <div className={styles.gotoTop}>
              <Link href={"/"} legacyBehavior>
                <a>
                  トップページに戻る
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <PageTop />
    </div>
        </>
    )
}

export const getServerSideProps = async (context: any) => {
    const keyword = context.query.keyword
    console.log(keyword);

    
    let { data: products, error } = await supabase.from("stocks").select(`*,items(*)`);

    const result = products?.filter((stock: Stock) => stock.items.name.toLowerCase().includes(keyword.toLowerCase()));
    if(error) {
        throw Error;
    }

    console.log(result);

    return {
        props: {
            products: result
        }
    }
}
 
export default Result;
