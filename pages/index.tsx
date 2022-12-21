import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import ItemList from "../components/itemList";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useCookie } from "../components/useCookie";
import PageTop from "../components/pageTop";
import Search from "../components/Search";

export default function Home() {
  const userID = useCookie();

  // 検索機能
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchValue, setSearchValue] = useState<string | undefined>("");

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setData(initializedData);
    setSearchQuery(
      items.filter((stock: any) =>
        stock.item.name.toLowerCase().includes(searchValue?.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/api/stock`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setSearchQuery(data);
      });
  }, []);
  const initializedData = {
    notifyFrequency: "",
  };

  // カテゴリ絞り込み機能

  const [data, setData] = useState(initializedData);

  const handleFrequencyChange = (e: any) => {
    const newValue =
      e.target.value === data.notifyFrequency ? "" : e.target.value;
    const newData = { ...data, notifyFrequency: newValue };
    setData(newData);

    if (e.target.checked) {
      setSearchQuery(
        items.filter((stock: any) => e.target.value === stock.item.series)
      );
    } else {
      setSearchQuery(items);
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
            <div className={styles.gridBox}>
              <ItemList searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <PageTop />
    </div>
  );
}
