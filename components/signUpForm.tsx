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

  const citySuggest = async () => {
    const values = getValues();
    const res = await fetch(
      `https://api.zipaddress.net/?zipcode=${values.postcode}`,
      {
        mode: "cors",
      }
    );
    const result = await res.json();
    setValue("prefecture", result.data.pref);
    setValue("city", result.data.address);
  };

  // thenで書いたが、読みにくいため使わない
  // const codeSuggest = () => {
  //   if (values.postcode) {
  //     fetch(`https://api.zipaddress.net/?zipcode=${values.postcode}`, {
  //       mode: "cors",
  //     })
  //       .then((result) => {
  //         return result.json();
  //       })
  //       .then((result) => {
  //         console.log(result);
  //         console.log(result.data);
  //       });
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>会員登録フォーム</h1>
        <h2>
          <span>お客様情報を入力してください。</span>
        </h2>
        <div>
          <label htmlFor="lastName">
            氏名<span>*必須</span>
          </label>
          <input
            id="lastName"
            placeholder="山田"
            {...register("lastname", { required: "入力が必須の項目です。" })}
          />
          <input
            id="firstName"
            placeholder="太郎"
            {...register("firstname", { required: "入力が必須の項目です。" })}
          />
          {errors.lastname?.message && (
            <div className="formError">
              {errors.lastname?.message as string}
            </div>
          )}
          {errors.firstname?.message && (
            <div className="formError">
              {errors.firstname?.message as string}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            氏名（カナ）<span>*必須</span>
          </label>
          <input
            id="kanaLastName"
            placeholder="ヤマダ"
            {...register("kanalastname", {
              required: "入力が必須の項目です。",
            })}
          />
          <input
            id="kanaFirstName"
            placeholder="タロウ"
            {...register("kanafirstname", {
              required: "入力が必須の項目です。",
            })}
          />
          {errors.kanalastname?.message && (
            <div className="formError">
              {errors.kanalastname?.message as string}
            </div>
          )}
          {errors.kanafirstname?.message && (
            <div className="formError">
              {errors.kanafirstname?.message as string}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="phoneNumber">
            電話番号<span>*必須</span>
          </label>
          <input
            id="phone"
            placeholder="0312345678"
            {...register("phone", {
              required: "入力が必須の項目です。",
              pattern: {
                value: /^0\d{9,10}$/,
                message: "電話番号を正しく入力してください",
              },
            })}
          />
          <p>・ハイフンなしで入力してください。</p>
          {errors.phone?.message && (
            <div className="formError">{errors.phone?.message as string}</div>
          )}
        </div>
        <div>
          <label htmlFor="email">
            メールアドレス<span>*必須</span>
          </label>
          <input
            id="email"
            placeholder="sample@sample.co.jp"
            {...register("email", {
              required: "入力が必須の項目です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "メールアドレスを正しく入力してください",
              },
            })}
          />
          <p>・メールアドレスはログインIDになります。</p>
          {errors.email?.message && (
            <div className="formError">{errors.email.message as string}</div>
          )}
        </div>
        <div>
          <label htmlFor="postCode">
            郵便番号<span>*必須</span>
          </label>
          <input
            type="text"
            placeholder="1600022"
            {...register("postcode", {
              required: "入力が必須の項目です。",
              pattern: {
                value: /^\d{3}?\d{4}$/,
                message: "郵便番号を正しく入力してください。",
              },
            })}
          ></input>
          <input
            type="button"
            className=""
            onClick={citySuggest}
            value="郵便番号から住所を自動入力"
          />

          {errors.postcode?.message && (
            <div className="formError">{errors.postcode.message as string}</div>
          )}
        </div>
        <div>
          <label htmlFor="prefecture">
            都道府県<span>*必須</span>
          </label>
          <input
            type="text"
            placeholder="東京都"
            id="prefecture"
            {...register("prefecture", { required: "入力が必須の項目です。" })}
          />
          {errors.prefecture?.message && (
            <div className="formError">
              {errors.prefecture.message as string}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="city">
            市区町村<span>*必須</span>
          </label>
          <input
            type="text"
            placeholder="新宿区新宿"
            id="city"
            {...register("city", { required: "入力が必須の項目です。" })}
          ></input>
          {errors.city?.message && (
            <div className="formError">{errors.city.message as string}</div>
          )}
        </div>
        <div>
          <label htmlFor="address">
            番地<span>*必須</span>
          </label>
          <input
            type="text"
            placeholder="4-3-25"
            id="address"
            {...register("address", { required: "入力が必須の項目です。" })}
          />
          {errors.address?.message && (
            <div className="formError">{errors.address.message as string}</div>
          )}
        </div>
        <div>
          <label htmlFor="building">アパート・マンション名</label>
          <input
            type="text"
            placeholder="TOKYU REIT新宿ビル8F"
            id="building"
            {...register("building")}
          />
        </div>
        <div>
          <label htmlFor="password">
            パスワード<span>*必須</span>
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "入力が必須の項目です。",
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
          <p>
            ・パスワードには大文字、小文字、数字を少なくとも１つ設定してください。
          </p>
          {errors.password?.message && (
            <div className="formError">{errors.password.message as string}</div>
          )}
        </div>
        <div>
          <label htmlFor="applicant-building">
            パスワード（再入力）<span>*必須</span>
          </label>
          <input
            type="password"
            id="applicant-address"
            {...register("password_confirmation", {
              required: "入力が必須の項目です。",
              validate: (value) =>
                value === getValues("password") || "パスワードが一致しません",
            })}
          />
          {errors.password_confirmation?.message && (
            <div className="formError">
              {errors.password_confirmation.message as string}
            </div>
          )}
        </div>

        <button type="submit">入力内容を確認</button>
      </form>
    </>
  );
};

export default SignUpForm;
