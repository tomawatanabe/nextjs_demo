import Link from "next/link";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { useCookie } from "../useCookie";
import styles from "../../styles/purchase.module.css";

const PurchaseConfirmation = ({ imageData, imageDataB }: any) => {
  const cookieName = useCookie();

  const { getValues } = useFormContext();
  const values = getValues();

  const handleSubmitUsedItemValue = () => {
    const values = getValues();
    const date = new Date();
    const today: string = date.toLocaleDateString();

    fetch(`${process.env. NEXT_PUBLIC_API}/api/usedItems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receptionDate: today,
        cookieName: cookieName,
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
        itemStatus: "受付済",
      }),
    });

    if (values.itemNameB) {
      fetch(`${process.env. NEXT_PUBLIC_API}/api/usedItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receptionDate: today,
          cookieName: cookieName,
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
          itemStatus: "受付済",
        }),
      });
    }

    alert("入力内容を送信しました");
  };

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
        <h2 className={styles.kaitori}>買取希望商品情報の確認</h2>
        <hr />
        <div className={styles.formgroupuseditem}>
          <div className="used-item-formA">
            <h3 className={styles.h3tag}>買取希望商品１</h3>
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
            <h3 className={styles.h3tag}>買取希望商品２</h3>
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
          <div className={styles.btn}>
            <Link href="/purchase" className="idbutton">
              入力内容を修正する
            </Link>
          </div>
        </div>
        <div className="button001">
          <div className={styles.btn}>
            <Link
              href="/"
              onClick={handleSubmitUsedItemValue}
              className="idbutton"
            >
              入力内容を送信する
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PurchaseConfirmation;
