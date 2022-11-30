import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import React, { use, useEffect } from "react";
import SignIn from "../../../components/SignIn";
import Link from "next/link";
import { useState } from "react";

const UserImfo = () => {
  const router = useRouter();

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const [userMail, setUserMail] = useState("");
  useEffect(() => {
    setUserMail(document.cookie);
  }, []);

  //郵便番号APIから住所を取得する関数
  const citySuggest = async () => {
    const values = getValues();
    const res = await fetch(
      `https://api.zipaddress.net/?zipcode=${values.postCode}`,
      {
        mode: "cors",
      }
    );

    const result = await res.json();

    //郵便番号が存在しない場合アラートを返す
    if (result.code === 404) {
      alert("存在しない郵便番号です");
      return;
    }

    setValue("prefecture", result.data.pref);
    setValue("city", result.data.address);
  };

  //DBから値を読み込みデフォルト値としてセット
  const get = async () => {
    const res = await fetch(`http://localhost:8000/users?email=${userMail}`);
    const data = await res.json();
    setValue("lastName", data[0]?.lastName);
    setValue("firstName", data[0]?.firstName);
    setValue("kanaLastName", data[0]?.kanaLastName);
    setValue("kanaFirstName", data[0]?.kanaFirstName);
    setValue("phoneNumber", data[0]?.phoneNumber);
    setValue("email", data[0]?.email);
    setValue("zipCode", data[0]?.zipCode);
    setValue("prefecture", data[0]?.prefecture);
    setValue("city", data[0]?.city);
    setValue("address", data[0]?.address);
    setValue("building", data[0]?.building);
    setValue("password", data[0]?.password);

    const userId = data[0]?.id;
    return userId;
  };

  get();

  //onClickでデータベースに登録
  const handleChangeUserValue = async () => {
    const values = getValues();
    const userId = await get();

    fetch(`http://localhost:8000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastName: values?.lastName,
        firstName: values?.firstName,
        kanaLastName: values?.kanaLastName,
        kanaFirstName: values?.kanaFirstName,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
        zipCode: values?.zipCode,
        prefecture: values?.prefecture,
        city: values?.city,
        address: values?.address,
        building: values?.building,
        password: values?.password,
      }),
    });
    alert("会員情報を変更しました");
    router.reload();
  };

  return (
    <>
      <SignIn>
        <form>
          <h1>お客様情報</h1>
          <h2>
            <span>お客様情報を変更してください。</span>
          </h2>
          <hr />
          <div>
            <label htmlFor="lastName">
              <span className="label-fit label-danger">必須</span>氏名（姓）
            </label>
            <input
              id="lastName"
              {...register("lastName", {
                required: "必須項目です。",
              })}
            />
          </div>
          <div>
            <label htmlFor="lastName">
              <span className="label-fit label-danger">必須</span>氏名（名）
            </label>
            <input
              id="firstName"
              {...register("firstName", {
                required: "必須項目です。",
              })}
            />
          </div>
          <div>
            <label htmlFor="kanaLastName">
              <span className="label-fit label-danger">必須</span>氏名（カナ姓）
            </label>
            <input
              id="kanaLastName"
              {...register("kanaLastName", {
                required: "必須項目です。",
              })}
            />
          </div>
          <div>
            <label htmlFor="kanaLastName">
              <span className="label-fit label-danger">必須</span>氏名（カナ名）
            </label>
            <input
              id="kanaFirstName"
              {...register("kanaFirstName", {
                required: "必須項目です。",
              })}
            />
          </div>
          <div>
            <div>
              <label htmlFor="phoneNumber">
                <span className="label-fit label-danger">必須</span>電話番号
              </label>
              <input
                id="phoneNumber"
                placeholder="0312345678"
                {...register("phoneNumber", {
                  required: "必須項目です。",
                  pattern: {
                    value: /^0\d{9,10}$/,
                    message: "電話番号を正しく入力してください",
                  },
                })}
              />
              {errors.phone?.message && (
                <span className="formError">
                  {errors.phone?.message as string}
                </span>
              )}
            </div>
            <div>
              <span className="notice">*ハイフンなしで入力してください。</span>
            </div>
          </div>
          <div>
            <label htmlFor="email">
              <span className="label-fit label-danger">必須</span>メールアドレス
            </label>

            <input
              id="email"
              placeholder="sample@sample.co.jp"
              {...register("email", {
                required: "必須項目です。",
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                  message: "メールアドレスを正しく入力してください",
                },
              })}
            />

            {errors.mail?.message && (
              <span className="formError">{errors.mail.message as string}</span>
            )}
            <div>
              <span className="notice">
                *メールアドレスはログインIDになります。
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="zipCode">
              <span className="label-fit label-danger">必須</span>郵便番号
            </label>
            <input
              type="text"
              placeholder="1600022"
              {...register("zipCode", {
                required: "必須項目です。",
                pattern: {
                  value: /^\d{3}?\d{4}$/,
                  message: "郵便番号を正しく入力してください。",
                },
              })}
            ></input>
            <input
              type="button"
              className="btn"
              onClick={citySuggest}
              value="住所を自動入力"
            />

            {errors.postCode?.message && (
              <span className="formError">
                {errors.postCode.message as string}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="prefecture">
              <span className="label-fit label-danger">必須</span>都道府県
            </label>
            <input
              type="text"
              placeholder="東京都"
              id="prefecture"
              {...register("prefecture", { required: "必須項目です。" })}
            />
            {errors.prefecture?.message && (
              <span className="formError">
                {errors.prefecture.message as string}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="city">
              <span className="label-fit label-danger">必須</span>市区町村
            </label>
            <input
              type="text"
              placeholder="新宿区新宿"
              id="city"
              {...register("city", { required: "必須項目です。" })}
            ></input>
            {errors.city?.message && (
              <span className="formError">{errors.city.message as string}</span>
            )}
          </div>
          <div>
            <label htmlFor="address">
              <span className="label-fit label-danger">必須</span>番地
            </label>
            <input
              type="text"
              placeholder="4-3-25"
              id="address"
              {...register("address", { required: "必須項目です。" })}
            />
            {errors.address?.message && (
              <span className="formError">
                {errors.address.message as string}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="building">
              <span className="label-fit label-warning">任意</span>建物名
            </label>
            <input
              type="text"
              placeholder="TOKYU REIT新宿ビル8F"
              id="building"
              {...register("building")}
            />
          </div>
          <div>
            <label htmlFor="password">
              <span className="label-fit label-danger">必須</span>パスワード
            </label>
            <input
              type="text"
              id="password"
              {...register("password", {
                required: "必須項目です。",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上で入力してください",
                },
                pattern: {
                  value: /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9]{8,}/,
                  message:
                    "パスワードは大文字、小文字、数字を少なくとも１つ入力してください",
                },
              })}
            />
            {errors.password?.message && (
              <span className="formError">
                {errors.password.message as string}
              </span>
            )}
          </div>
          <input
            type="button"
            onClick={handleChangeUserValue}
            value="変更内容を確定する"
          />
        </form>
        <Link href="http://localhost:3000/userimfo">会員情報に戻る</Link>
      </SignIn>
    </>
  );
};

export default UserImfo;
