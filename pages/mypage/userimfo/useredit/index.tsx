import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import SignIn from "../../../../components/SignIn";
import Link from "next/link";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { useCookie } from "../../../../components/useCookie";
import { supabase } from "../../../../lib/supabase-client";

type FetchError = string | null;

const UserImfo = () => {
  const cookieName = useCookie();

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldUnregister: false,
  });

  //郵便番号APIから住所を取得する関数
  const citySuggest = async () => {
    const values = getValues();
    const res = await fetch(
      `https://api.zipaddress.net/?zipcode=${values.zipCode}`,
      {
        mode: "cors",
      }
    );

    const result = await res.json();

    //郵便番号が存在しない場合アラートを返す
    if (result.code === 404 || result.code === 400) {
      alert("存在しない郵便番号です");
      return;
    }

    setValue("prefecture", result.data.pref);
    setValue("city", result.data.address);
  };

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<FetchError>(null);

  useEffect(() => {
    // ログインしてたら（cookie持ってたら会員情報を自動入力）
    if (cookieName === "userID=" || undefined) {
    } else {
      //DBから値を読み込み
      const setUserImfo = async () => {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/getUserImfo`
        )
          .then((res) => res.json())
          .catch((err) => console.log(`エラー: ${err}`));

        if (data) {
          setFetchError(null);
          //デフォルト値としてセット
          setValue("lastName", data?.last_name);
          setValue("firstName", data?.first_name);
          setValue("kanaLastName", data?.kana_last_name);
          setValue("kanaFirstName", data?.kana_first_name);
          setValue("phoneNumber", data?.phone);
          setValue("email", data?.email);
          setValue("zipCode", data?.zip_code);
          setValue("prefecture", data?.prefecture);
          setValue("city", data?.city);
          setValue("address", data?.address);
          setValue("building", data?.building);
          setValue("password", data?.password);
          //setterを呼び出して再レンダリングをかける
          setLoading(false);
        }
      };
      setUserImfo();
    }
  }, [loading]);

  const onSubmit = async (e: any) => {
    const values = getValues();

    const { error } = await supabase
      .from("users")
      .update([
        {
          last_name: values?.lastName,
          first_name: values?.firstName,
          kana_last_name: values?.kanaLastName,
          kana_first_name: values?.kanaFirstName,
          phone: values?.phoneNumber,
          email: values?.email,
          zip_code: values?.zipCode,
          prefecture: values?.prefecture,
          city: values?.city,
          address: values?.address,
          building: values?.building,
          password: values?.password,
        },
      ])
      .eq("id", cookieName);

    if (error) {
      console.log(error);
    }

    alert("会員情報が更新されました");
  };

  return (
    <>
      <SignIn>
        <Header />
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>お客様情報</h1>
          {fetchError && <div>{fetchError}</div>}
          <h2>
            <span>お客様情報を変更してください。</span>
          </h2>
          <hr />
          <div>
            <label htmlFor="lastName">
              <span className="label-fit label-danger">必須</span>氏名
            </label>

            <input
              id="lastName"
              placeholder="山田"
              {...register("lastName", {
                required: "必須項目です。",
              })}
            />

            <input
              id="firstName"
              placeholder="太郎"
              {...register("firstName", {
                required: "必須項目です。",
              })}
            />

            {(errors.firstName?.message && (
              <span className="formError">
                {errors.firstName?.message as string}
              </span>
            )) ||
              (errors.lastName?.message && (
                <span className="formError">
                  {errors.lastName?.message as string}
                </span>
              ))}
          </div>
          <div>
            <label htmlFor="kanaLastName">
              <span className="label-fit label-danger">必須</span>氏名（カナ）
            </label>

            <input
              id="kanaLastName"
              placeholder="ヤマダ"
              {...register("kanaLastName", {
                required: "必須項目です。",
              })}
            />
            <input
              id="kanaFirstName"
              placeholder="タロウ"
              {...register("kanaFirstName", {
                required: "必須項目です。",
              })}
            />

            {(errors.kanaLastName?.message && (
              <span className="formError">
                {errors.kanaLastName?.message as string}
              </span>
            )) ||
              (errors.kanaFirstName?.message && (
                <span className="formError">
                  {errors.kanaName?.message as string}
                </span>
              ))}
          </div>
          <div>
            <div>
              <label htmlFor="phoneNumber">
                <span className="label-fit label-danger">必須</span>電話番号
              </label>

              <input
                id="phone"
                placeholder="0312345678"
                {...register("phoneNumber", {
                  required: "必須項目です。",
                  pattern: {
                    value: /^0\d{9,10}$/,
                    message: "電話番号を正しく入力してください",
                  },
                })}
              />
              {errors.phoneNumber?.message && (
                <span className="formError">
                  {errors.phoneNumber?.message as string}
                </span>
              )}
            </div>
            <div>
              <span className="notice">*ハイフンなしで入力してください。</span>
            </div>
          </div>
          <div>
            <label htmlFor="mail">
              <span className="label-fit label-danger">必須</span>メールアドレス
            </label>

            <input
              id="mail"
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

            {errors.email?.message && (
              <span className="formError">
                {errors.email.message as string}
              </span>
            )}
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
              className="zipCodeBtn"
              onClick={citySuggest}
              value="住所を自動入力"
            />

            {errors.zipCode?.message && (
              <span className="formError">
                {errors.zipCode.message as string}
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
              type="password"
              id="password"
              {...register("password", {
                required: "必須項目です。",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上で入力してください",
                },
                maxLength: {
                  value: 24,
                  message: "パスワードは24文字以下で入力してください",
                },
                pattern: {
                  value: /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9]{8,}$/,
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
            type="submit"
            className="zipCodeBtn"
            value="変更内容を確定する"
          />
        </form>
        <Link href="/mypage/userimfo">会員情報に戻る</Link>
        <Footer />
      </SignIn>
    </>
  );
};

export default UserImfo;
