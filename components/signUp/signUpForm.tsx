import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import React from "react";

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const onSubmit = async () => {
    router.push(`/signup?confirm=1`);
  };

  console.log(errors);

  //郵便番号APIから住所を取得する関数
  const citySuggest = async () => {
    const values = getValues();
    const res = await fetch(
      `https://api.zipaddress.net/?zipcode=${values.postcode}`,
      {
        mode: "cors",
      }
    );

    const result = await res.json();

    //存在しない郵便番号の場合、アラートを返す
    if (result.code === 404) {
      alert("存在しない郵便番号です");
      return;
    }
    
    setValue("prefecture", result.data.pref);
    setValue("city", result.data.address);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>会員登録フォーム</h1>
        <h2>
          <span>お客様情報を入力してください。</span>
        </h2>
        <hr />
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名
          </label>

          <input
            id="lastName"
            placeholder="山田"
            {...register("lastname", {
              required: "必須項目です。",
            })}
          />

          <input
            id="firstName"
            placeholder="太郎"
            {...register("firstname", {
              required: "必須項目です。",
            })}
          />

          {(errors.firstname?.message && (
            <span className="formError">
              {errors.firstname?.message as string}
            </span>
          )) ||
            (errors.lastname?.message && (
              <span className="formError">
                {errors.lastname?.message as string}
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
            {...register("kanalastname", {
              required: "必須項目です。",
            })}
          />
          <input
            id="kanaFirstName"
            placeholder="タロウ"
            {...register("kanafirstname", {
              required: "必須項目です。",
            })}
          />

          {(errors.kanalastname?.message && (
            <span className="formError">
              {errors.kanalastname?.message as string}
            </span>
          )) ||
            (errors.kanafirstname?.message && (
              <span className="formError">
                {errors.kanalastname?.message as string}
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
              {...register("phone", {
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

          {errors.email?.message && (
            <span className="formError">{errors.email.message as string}</span>
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
            {...register("postcode", {
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

          {errors.postcode?.message && (
            <span className="formError">
              {errors.postcode.message as string}
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
        <div>
          <label htmlFor="applicant-building">
            <span className="label-fit label-danger">必須</span>
            パスワード（確認）
          </label>
          <input
            type="password"
            id="applicant-address"
            {...register("password_confirmation", {
              required: "必須項目です。",
              validate: (value) =>
                value === getValues("password") || "パスワードが一致しません",
            })}
          />
          {errors.password_confirmation?.message && (
            <span className="formError">
              {errors.password_confirmation.message as string}
            </span>
          )}
        </div>
        <div>
          <span className="notice">
            *パスワードには大文字、小文字、数字を少なくとも１つ設定してください。
          </span>
        </div>

        <button type="submit" className="form-submit-btn">
          入力内容を確認
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
