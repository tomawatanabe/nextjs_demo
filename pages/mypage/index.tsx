import React, { use, useEffect } from "react";
import SignIn from "../../components/SignIn";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FavoriteList from "../../components/FavoriteList";
import UsedItemList from "../../components/UsedItemList";
import SettlementHistory from "../../components/SettlementHistory";
import styles from "../../styles/MyPage.module.css";
import PageTop from "../../components/pageTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSpaghettiMonsterFlying,
} from "@fortawesome/free-solid-svg-icons";

const MyPage = () => {
  return (
    <>
      <SignIn>
        <Header />
        <div className={styles.mypage_main_content}>
          <div className={styles.main_title_wrapper}>
            <h1>マイページ</h1>
            <div className={styles.user_imfo_icon}>
              <Link href="/mypage/userimfo/">
                <FontAwesomeIcon icon={faUser} />
                <span> 会員情報</span>
              </Link>
            </div>
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
        <Chatbot />
        <Footer />
      </SignIn>
    </>
  );
};

export default MyPage;
