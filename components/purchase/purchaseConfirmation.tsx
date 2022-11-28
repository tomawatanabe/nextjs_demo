import Link from "next/link";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

const PurchaseConfirmation = (props:any) => {
  const router = useRouter();

  const {
    formState: { isValid },
    getValues,
  } = useFormContext();

  const values = getValues();

  //Set to true if the form doesn't have any errors.
  //何かしらエラーがあるとき会員登録ページに飛ぶ
  // if (!isValid) {
  //   router.push("/purchase");
  // }

  return (
    <>
      <form>
        <h1>
          <span>買取受付フォーム</span>
        </h1>
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
        </p>{" "}
        <h2>買取希望商品情報の確認</h2>
        <hr />
        <h3>買取希望商品１</h3>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>品名
          </span>
          {values.itemName}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>品番
          </span>
          {values.itemCode}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>サイズ（cm）
          </span>
          {values.itemSize}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>カラー
          </span>
          {values.itemColor}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>写真
          </span>
        </p>
        {/* <Image src={imagePreview} alt="画像プレビュー" width={150} /> */}

        <div className="button001">
          <Link href="/purchase">入力内容を修正する</Link>
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

export default PurchaseConfirmation;
