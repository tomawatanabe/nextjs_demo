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
        <h1>入力内容を確認してください</h1>
        <h2>お客様情報の確認</h2>
        <p>
          氏名{values.lastname}
          {values.firstname}
        </p>
        <p>
          氏名（フリガナ）{values.kanalastname}
          {values.kanafirstname}
        </p>
        <p>電話番号{values.phone}</p>
        <p>メールアドレス{values.email}</p>
        <p>郵便番号{values.postcode}</p>
        <p>都道府県{values.prefecture}</p>
        <p>市区町村{values.city}</p>
        <p>番地{values.address}</p>
        <p>アパート・マンション名{values?.building}</p>
        <div className="button001">
          <Link href="/signup">入力内容を修正する</Link>
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

export default SignUpConfirmation;
