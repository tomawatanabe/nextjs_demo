import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import React from "react";

const UserImfo = () => {
  // const router = useRouter();

  // const {
  //   register,
  //   handleSubmit,
  //   getValues,
  //   setValue,
  //   formState: { errors },
  // } = useFormContext();

  // //submitが押されたとき、確認画面に遷移する
  // const onSubmit = () => {
  //   router.push(`/signup?confirm=1`);
  //   console.log("確認ボタンが押されました");
  // };

  // // console.log(errors);

  // //郵便番号APIから住所を取得する関数
  // const citySuggest = async () => {
  //   const values = getValues();
  //   const res = await fetch(
  //     `https://api.zipaddress.net/?zipcode=${values.postCode}`,
  //     {
  //       mode: "cors",
  //     }
  //   );

  //   const result = await res.json();

  //   //存在しない郵便番号の場合、アラートを返す
  //   if (result.code === 404) {
  //     alert("存在しない郵便番号です");
  //     return;
  //   }

  //   setValue("prefecture", result.data.pref);
  //   setValue("city", result.data.address);
  // };

  return (
    <>
      <h1>お客様情報</h1>
      <h2>
        <span>お客様情報を確認してください。</span>
      </h2>
      <hr />
      <div>
        <label htmlFor="lastName">
          <span className="label-fit label-danger">必須</span>氏名
        </label>
      </div>
      <div>
        <label htmlFor="kanaLastName">
          <span className="label-fit label-danger">必須</span>氏名（カナ）
        </label>
      </div>
      <div>
        <div>
          <label htmlFor="phoneNumber">
            <span className="label-fit label-danger">必須</span>電話番号
          </label>
        </div>
        <div>
          <span className="notice">*ハイフンなしで入力してください。</span>
        </div>
      </div>
      <div>
        <label htmlFor="mail">
          <span className="label-fit label-danger">必須</span>メールアドレス
        </label>

        <div>
          <span className="notice">
            *メールアドレスはログインIDになります。
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="postCode">
          <span className="label-fit label-danger">必須</span>郵便番号
        </label>
      </div>
      <div>
        <label htmlFor="prefecture">
          <span className="label-fit label-danger">必須</span>都道府県
        </label>
      </div>
      <div>
        <label htmlFor="city">
          <span className="label-fit label-danger">必須</span>市区町村
        </label>
      </div>
      <div>
        <label htmlFor="address">
          <span className="label-fit label-danger">必須</span>番地
        </label>
      </div>
      <div>
        <label htmlFor="building">
          <span className="label-fit label-warning">任意</span>建物名
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <span className="label-fit label-danger">必須</span>パスワード
        </label>
      </div>
    </>
  );
};

export default UserImfo;
