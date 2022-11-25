import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

//formでデータ送信はonsubmit

const ContactForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  console.log(errors);

  const onSubmit = async (data: any) => {
    console.log(data);
    router.push(`/contact?confirm=1`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>お問い合わせフォーム</h1>
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
                value:
                  /^0\d{9,10}$/,
                message: "電話番号を正しく入力してください",
              },
            })}
          />
          *ハイフンなし
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
          {errors.email?.message && (
            <div className="formError">{errors.email.message as string}</div>
          )}
        </div>
        <div>
          <h2>
            <span>お問い合わせ内容を入力してください。</span>
          </h2>
          <textarea
            id="content"
            placeholder="お問い合わせ内容を入力してください"
            {...register("content", { required: "入力が必須の項目です。" })}
          />
          {errors.phone?.message && (
            <div className="formError">{errors.content?.message as string}</div>
          )}
        </div>
        <button type="submit">入力内容を確認</button>
      </form>
    </>
  );
};

export default ContactForm;
