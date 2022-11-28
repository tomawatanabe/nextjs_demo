import Link from "next/link";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";

const SignUpConfirmation = () => {
  const router = useRouter();

  const {
    formState: { isValid },
    getValues,
  } = useFormContext();

  const values = getValues();

  //Set to true if the form doesn't have any errors.
  //何かしらエラーがあるとき会員登録ページに飛ぶ
  if (!isValid) {
    router.push("/signup");
  }

  return (
    <>
      <form>
        <h1>会員登録フォーム</h1>
        <h2>入力内容を確認してください</h2>
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
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>郵便番号
          </span>
          {values.postcode}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>都道府県
          </span>
          {values.prefecture}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>市区町村
          </span>
          {values.city}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>番地
          </span>
          {values.address}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-warning">任意</span>
            建物名
          </span>
          {values?.building}
        </p>
        <div className="form-submit-btn">
          <Link href="/signup">入力内容を修正</Link>
        </div>
        <div className="form-submit-btn">
          <Link href="/" onClick={() => alert("入力内容を送信しました")}>
            入力内容を送信
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUpConfirmation;
