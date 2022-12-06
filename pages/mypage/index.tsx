import React, { use, useEffect } from "react";
import SignIn from "../../components/SignIn";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FavoriteList from "../../components/FavoriteList";
import UsedItemList from "../../components/UsedItemList";
import SettlementHistory from "../../components/SettlementHistory";
import styles from "../../styles/MyPage.module.css";
import Image from "next/image";
import PageTop from "../../components/pageTop";

const MyPage = () => {
  return (
    <>
      <SignIn>
        <Header />
        <div className={styles.mypage_main_content}>
          <div className={styles.title_wrapper}>
            <h1 className={styles.content_title}>マイページ</h1>
            <span className={styles.user_imfo_icon}>
              <Link href="/mypage/userimfo/">
                <Image
                  className={styles.btn}
                  src="/images/user_icon.png"
                  alt="詳細ページにジャンプするボタン"
                  width={20}
                  height={20}
                />
                会員情報
              </Link>
            </span>
          </div>
          <hr />
          <div>
            <SettlementHistory />
          </div>
          <hr />
          <div>
            <FavoriteList />
          </div>
          <hr />
          <div>
            <UsedItemList />
          </div>
        </div>
        <PageTop />
        <Footer />
      </SignIn>
    </>
  );
};

export default MyPage;
