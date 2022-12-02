import React, { use, useEffect } from "react";
import SignIn from "../../components/SignIn";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FavoriteList from "../../components/FavoriteList";
import UsedItemList from "../../components/UsedItemList";
import SettlementHistory from "../../components/SettlementHistory";

const MyPage = () => {
  return (
    <>
      <SignIn>
        <Header />
        <div>
          <h1>マイページ</h1>
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
        <h2>
          <Link href="http://localhost:3000/mypage/userimfo/">
            会員情報変更
          </Link>
        </h2>
        <h2>
          <Link href="http://localhost:3000/cart">ショッピングカート</Link>
        </h2>
        <Footer />
      </SignIn>
    </>
  );
};

export default MyPage;
