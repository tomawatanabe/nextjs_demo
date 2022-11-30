import React, { use, useEffect } from "react";
import SignIn from "../../components/SignIn";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
          <h2>買取受付状況</h2>
        </div>
        <hr />
        <div>
          <h2>お気に入りリスト</h2>
        </div>
        <hr />
        <div>
          <h2>購入履歴</h2>
        </div>
        <Link href="http://localhost:3000/mypage/userimfo/">会員情報</Link>
        <Footer />
      </SignIn>
    </>
  );
};

export default MyPage;
