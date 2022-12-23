import Link from "next/link";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { supabase } from "../../lib/supabase-client";

const SignUpConfirmation = () => {
  const router = useRouter();

  const { getValues } = useFormContext();

  const values = getValues();

  //データベースに登録する関数
  const handleSubmitUserValue = async (e: any) => {
    e.preventDefault();
    const values = getValues();

    const { data, error } = await supabase.from("users").insert([
      {
        lastName: values.lastName,
        firstName: values.firstName,
        kanaLastName: values.kanaLastName,
        kanaFirstName: values.kanaFirstName,
        phoneNumber: values.phone,
        email: values.mail,
        zipCode: values.postCode,
        prefecture: values.prefecture,
        city: values.city,
        address: values.address,
        building: values.building,
        password: values.password,
      },
    ]);

    //shopppingCartにレコードを追加
    fetch(`/api/shoppingCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: [],
      }),
    });

    router.push("/");
  };
  return (
    <>
      <form onSubmit={handleSubmitUserValue}>
        <h2>入力内容を確認してください</h2>
        <hr />
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>氏名
          </span>
          {values.lastName}&nbsp;
          {values.firstName}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>
            氏名（フリガナ）
          </span>
          {values.kanaLastName}&nbsp;
          {values.kanaFirstName}
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
          {values.mail}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>郵便番号
          </span>
          {values.postCode}
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
        <div>
          <Link href="/signup" className="idbutton">
            入力内容を修正
          </Link>
        </div>
        <div className="form-submit-btn">
          <input type="submit" className="idbutton" value="入力内容を送信" />
        </div>
      </form>
    </>
  );
};
export default SignUpConfirmation;
