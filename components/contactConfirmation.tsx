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
        <h2>お問い合わせ内容の確認</h2>
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
