import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, useFormContext } from "react-hook-form";
import styles from "../../styles/purchase.module.css";

const ContactConfirmation = () => {
  const router = useRouter();

  //useFormContextは入力画面で入力した値を使用するために使う
  const { getValues } = useFormContext();

  const values = getValues();

  return (
    <div className={styles.outside}>
      <form>
        <h1 className={styles.midashi}>入力内容を確認してください</h1>
        <h2 className={styles.kaitori}>お客様情報の確認</h2>
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
        <h2 className={styles.kaitori}>お問い合わせ内容の確認</h2>
        <hr />
        <p>{values.content}</p>
        <div className={styles.btn}>
          <Link href="/contact" className="idbutton">
            入力内容を修正する
          </Link>
        </div>
        <div className={styles.btn}>
          <Link
            href="/"
            onClick={() => alert("入力内容を送信しました")}
            className="idbutton"
          >
            入力内容を送信する
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ContactConfirmation;
