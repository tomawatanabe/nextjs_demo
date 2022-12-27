import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import ItemList from "../components/itemList";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import PageTop from "../components/pageTop";
import Search from "../components/Search";
import Router from "next/router";

export default function Home() {
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

  return (
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
          <div className={styles.mains}>
            <div className={styles.search}>
              <Search
                onChange={handleSearch}
                onClick={handleClick}
                data={data}
                handleFrequencyChange={handleFrequencyChange}
              />
            </div>
            <ItemList />
          </div>
        </div>
      </main>
      <Footer />
      <PageTop />
    </div>
  );
}
