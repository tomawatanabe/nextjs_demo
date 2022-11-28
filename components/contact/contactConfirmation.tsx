import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, useFormContext } from "react-hook-form";

const ContactConfirmation = () => {
  const router = useRouter();

  //useFormContextは入力画面で入力した値を使用するために使う
  const {
    // formState: { isValid },
    getValues,
  } = useFormContext();

  const values = getValues();

  // if (!isValid) {
  //   router.push("/contact");
  // }

  return (
    <>
      <form>
        <h1>入力内容を確認してください</h1>
        <h2>お客様情報の確認</h2>
        <hr />
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>氏名
          </span>
          {values.lastname}&nbsp;
          {values.firstname}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>氏名（フリガナ）
          </span>
          {values.kanalastname}&nbsp;
          {values.kanafirstname}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>電話番号
          </span>
          {values.phone}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>メールアドレス
          </span>
          {values.email}
        </p>
        <h2>お問い合わせ内容の確認</h2>
        <hr />
        <p>{values.content}</p>
        <div className="button001">
          <Link href="/contact">入力内容を修正する</Link>
        </div>
        <div className="button001">
          <Link href="/" onClick={() => alert("入力内容を送信しました")}>
            入力内容を送信する
          </Link>
        </div>
      </form>
    </>
  );
};

export default ContactConfirmation;
