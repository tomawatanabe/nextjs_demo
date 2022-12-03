import useSWR from "swr";
import React, { use, useEffect } from "react";
import SignIn from "../../../components/SignIn";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useCookie } from "../../../components/useCookie";

const UserImfo = () => {
  const cookieName = useCookie();

  const fetcher = (resource: string) =>
    fetch(resource).then((res) => res.json());

  const { data, error } = useSWR(
    `http://localhost:8000/users?id=${cookieName}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;

  return (
    <>
      <SignIn>
        <Header />
        <h1>お客様情報</h1>
        <h2>
          <span>お客様情報を確認してください。</span>
        </h2>
        <hr />
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名（姓）
          </label>
          {data[0]?.lastName}
        </div>
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名（名）
          </label>
          {data[0]?.firstName}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ姓）
          </label>
          {data[0]?.kanaLastName}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ名）
          </label>
          {data[0]?.kanaFirstName}
        </div>
        <div>
          <div>
            <label htmlFor="phoneNumber">
              <span className="label-fit label-danger">必須</span>電話番号
            </label>
            {data[0]?.phoneNumber}
          </div>
        </div>
        <div>
          <label htmlFor="mail">
            <span className="label-fit label-danger">必須</span>メールアドレス
          </label>
          {data[0]?.email}
        </div>
        <div>
          <label htmlFor="postCode">
            <span className="label-fit label-danger">必須</span>郵便番号
          </label>
          {data[0]?.zipCode}
        </div>
        <div>
          <label htmlFor="prefecture">
            <span className="label-fit label-danger">必須</span>都道府県
          </label>
          {data[0]?.prefecture}
        </div>
        <div>
          <label htmlFor="city">
            <span className="label-fit label-danger">必須</span>市区町村
          </label>
          {data[0]?.city}
        </div>

        <div>
          <label htmlFor="address">
            <span className="label-fit label-danger">必須</span>番地
          </label>
          {data[0]?.address}
        </div>
        <div>
          <label htmlFor="building">
            <span className="label-fit label-warning">任意</span>建物名
          </label>
          {data[0]?.building}
        </div>
        <div>
          <label htmlFor="password">
            <span className="label-fit label-danger">必須</span>パスワード
          </label>
          {data[0]?.password}
        </div>

        <Link href="http://localhost:3000/mypage">マイページに戻る</Link>
        <Link href="http://localhost:3000/mypage/userimfo/useredit">
          会員情報を編集する
        </Link>
        <Footer />
      </SignIn>
    </>
  );
};

export default UserImfo;