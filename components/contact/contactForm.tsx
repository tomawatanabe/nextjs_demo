import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "../../styles/purchase.module.css";
import { useCookie } from "../useCookie";

type FetchError = string | null;

const ContactForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<FetchError>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const values = getValues();
  const cookieName = useCookie();

  useEffect(() => {
    //RHFのvaluesオブジェクトの値を配列として定義
    const valuesArr = Object.values(values);

    // ログインしてなかったら何もしない
    if (cookieName === "userID=" || undefined) {
      return;

      //valuesArrにひとつでもtruthyなものがあったら初期値はセットしない
    } else if (valuesArr.some((ele) => Boolean(ele) === true)) {
      setLoading(false);
      return;

      //valuesArrが全てfalsyだったら初期値をセットする
    } else {
      const setUserImfo = async () => {
        const data = await fetch(`$/api/getUserImfo`)
          .then((res) => res.json())
          .catch((err) => {
            setFetchError("Coudn't fetch user imformation.");
            console.log(`エラー: ${err}`);
          });

        if (data) {
          //デフォルト値としてセット
          setFetchError(null);
          setValue("lastname", data?.last_name);
          setValue("firstname", data?.first_name);
          setValue("kanalastname", data?.kana_last_name);
          setValue("kanafirstname", data?.kana_first_name);
          setValue("phone", data?.phone);
          setValue("email", data?.email);
          setLoading(false);
        }
      };
      setUserImfo();
    }
  }, [loading]);

  const onSubmit = async () => {
    router.push(`/contact?confirm=1`);
  };

  return (
    <div className={styles.outside}>
      {fetchError && <div>{fetchError}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>お問い合わせフォーム</h1>
        <h2 className={styles.kaitori}>
          <span className={styles.midashi}>お客様情報を入力してください。</span>
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
        </div>

        <div>
          <h2>
            <span className={styles.midashi}>
              お問い合わせ内容を入力してください。
            </span>
          </h2>
          <hr />
          <textarea
            cols={80}
            rows={5}
            id="content"
            placeholder="お問い合わせ内容を入力してください"
            {...register("content", { required: "入力が必須の項目です。" })}
          />
          {errors.phone?.message && (
            <div className="formError">{errors.content?.message as string}</div>
          )}
        </div>
        <button type="submit" className="idbutton">
          入力内容を確認
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
