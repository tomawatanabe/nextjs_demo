import Link from "next/link";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { useCookie } from "../useCookie";

const PurchaseConfirmation = ({ imageData, imageDataB }: any) => {
  const userID = useCookie();

  const { getValues } = useFormContext();

  const values = getValues();

  const handleSubmitUsedItemValue = () => {
    const values = getValues();
    const today = new Date();

    fetch("http://localhost:8000/usedItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerID: userID,
        sellerLastName: values.lastName,
        sellerFirstName: values.firstName,
        sellerKanaLastName: values.kanaFirstName,
        sellerKanaFirstName: values.kanaLastName,
        sellerPhoneNumber: values.phone,
        sellerEmail: values.email,
        sellerZipCode: values.zipCode,
        sellerPrefecture: values.prefecture,
        sellerCity: values.city,
        sellerAddress: values.address,
        sellerBuilding: values.building,
        itemName: values.itemName,
        itemCode: values.itemCode,
        itemSize: values.itemSize,
        itemColor: values.itemColor,
        itemNote: values.itemNote,
        receptionDate: today,
        itemStatus: "受付済み",
      }),
    });

    if (values.itemNameB) {
      fetch("http://localhost:8000/usedItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sellerID: userID,
          sellerLastName: values.lastName,
          sellerFirstName: values.firstName,
          sellerKanaLastName: values.kanaFirstName,
          sellerKanaFirstName: values.kanaLastName,
          sellerPhoneNumber: values.phone,
          sellerEmail: values.email,
          sellerZipCode: values.zipCode,
          sellerPrefecture: values.prefecture,
          sellerCity: values.city,
          sellerAddress: values.address,
          sellerBuilding: values.building,
          itemName: values.itemNameB,
          itemCode: values.itemCodeB,
          itemSize: values.itemSizeB,
          itemColor: values.itemColorB,
          itemNote: values.itemNoteB,
          receptionDate: today,
          itemStatus: "受付済み",
        }),
      });
    }

    alert("入力内容を送信しました");
  };

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
          {values.lastName}&nbsp;
          {values.firstName}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>氏名（フリガナ）
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
          {values.email}
        </p>
        <p>
          <span className="subtitle">
            <span className="label-fit label-danger">必須</span>郵便番号
          </span>
          {values.zipCode}
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
        <h2>買取希望商品情報の確認</h2>
        <hr />
        <div className="form-group-used-item">
          <div className="used-item-formA">
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
              {values?.itemPhoto[0]?.name}
            </p>
            <span className="subtitle-preview">*プレビュー</span>
            {!!imageData && (
              <span className="preview">
                {/* stateのバイナリデータを参照する */}
                <Image
                  src={imageData}
                  alt="画像プレビュー"
                  height={150}
                  width={150}
                />
              </span>
            )}
            <p>
              <span className="subtitle">
                <span className="label-fit label-warning">任意</span>
                備考
              </span>
              {values?.itemNote}
            </p>
          </div>
          <div className="used-item-formB">
            <h3>買取希望商品２</h3>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>品名
              </span>
              {values?.itemNameB}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>品番
              </span>
              {values?.itemCodeB}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>サイズ（cm）
              </span>
              {values?.itemSizeB}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>カラー
              </span>
              {values?.itemColorB}
            </p>
            <p>
              <span className="subtitle">
                <span className="label-fit label-danger">必須</span>写真
              </span>
              {values?.itemPhotoB[0]?.name}
            </p>
            <span className="subtitle-preview">*プレビュー</span>
            {!!imageDataB && (
              <span className="preview">
                <Image
                  src={imageDataB}
                  alt="画像プレビュー"
                  height={150}
                  width={150}
                />
              </span>
            )}
            <p>
              <span className="subtitle">
                <span className="label-fit label-warning">任意</span>
                備考
              </span>
              {values?.itemNoteB}
            </p>
          </div>
        </div>
        <hr />
        <div>
          <span className="subtitle">
            <span className="label-fit label-warning">任意</span>備考
          </span>
          {values?.itemAdd}
        </div>
        <div className="button001">
          <Link href="/purchase">入力内容を修正する</Link>
        </div>
        <div className="button001">
          <Link href="/" onClick={handleSubmitUsedItemValue}>
            入力内容を送信する
          </Link>
        </div>
      </form>
    </>
  );
};

export default PurchaseConfirmation;
