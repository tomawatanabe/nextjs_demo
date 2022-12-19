import React, { use, useEffect, useState } from "react";
import SignIn from "../../../components/SignIn";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useCookie } from "../../../components/useCookie";
import { supabase } from "../../../lib/supabase-client";
import { Users } from "../../../types";

type FetchError = string | null;
type Imfo = Users | null;

const UserImfo = () => {
  const [fetchError, setFetchError] = useState<FetchError>(null);
  const [imfo, setImfo] = useState<Imfo>(null);
  const cookieName = useCookie();

  // const fetcher = (resource: string) =>
  //   fetch(resource, { method: "GET" }).then((res) => res.json());

  // const { data, error } = useSWR(
  //   `${process.env.NEXT_PUBLIC_API}/api/getUsers`,
  //   fetcher
  // );

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", Number(cookieName));

      if (error) {
        setFetchError("couldn't fetch data");
        setImfo(null);
        console.log(error);
      }

      if (data) {
        setImfo(data[0]);
        setFetchError(null);
      }
    };
    fetchUsers();
  });

  return (
    <>
      <SignIn>
        <Header />
        <h1>お客様情報</h1>
        {fetchError && <div>{fetchError}</div>}
        <h2>
          <span>お客様情報を確認してください。</span>
        </h2>
        <hr />
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名（姓）
          </label>
          {imfo?.lastName}
        </div>
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名（名）
          </label>
          {imfo?.firstName}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ姓）
          </label>
          {imfo?.kanaLastName}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ名）
          </label>
          {imfo?.kanaFirstName}
        </div>
        <div>
          <div>
            <label htmlFor="phoneNumber">
              <span className="label-fit label-danger">必須</span>電話番号
            </label>
            {imfo?.phoneNumber}
          </div>
        </div>
        <div>
          <label htmlFor="mail">
            <span className="label-fit label-danger">必須</span>メールアドレス
          </label>
          {imfo?.email}
        </div>
        <div>
          <label htmlFor="postCode">
            <span className="label-fit label-danger">必須</span>郵便番号
          </label>
          {imfo?.zipCode}
        </div>
        <div>
          <label htmlFor="prefecture">
            <span className="label-fit label-danger">必須</span>都道府県
          </label>
          {imfo?.prefecture}
        </div>
        <div>
          <label htmlFor="city">
            <span className="label-fit label-danger">必須</span>市区町村
          </label>
          {imfo?.city}
        </div>

        <div>
          <label htmlFor="address">
            <span className="label-fit label-danger">必須</span>番地
          </label>
          {imfo?.address}
        </div>
        <div>
          <label htmlFor="building">
            <span className="label-fit label-warning">任意</span>建物名
          </label>
          {imfo?.building}
        </div>
        <div>
          <label htmlFor="password">
            <span className="label-fit label-danger">必須</span>パスワード
          </label>
          {imfo?.password}
        </div>

        <Link href="/mypage">マイページに戻る</Link>
        <Link href="/mypage/userimfo/useredit" className="userinfoa">
          会員情報を編集する
        </Link>

        <Footer />
      </SignIn>
    </>
  );
};

export default UserImfo;
