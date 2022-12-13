import { useRouter } from "next/router";
import PurchaseForm from "../../components/purchase/purchaseForm";
import PurchaseConfirmation from "../../components/purchase/purchaseConfirmation";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import styles from "../../styles/purchase.module.css";
import PageTop from "../../components/pageTop";

const Purchase = () => {
  //inputに登録された画像のバイナリデータを保持するstate
  //型名、要検討
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null | undefined
  >(undefined);
  const [imagePreviewB, setImagePreviewB] = useState<
    string | ArrayBuffer | null | undefined
  >(undefined);

  //inputに登録された画像のバイナリデータをstateに保持する関数
  const onChangeFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    //imagePreviewの値をundefinedに初期化
    setImagePreview(undefined);

    // 何も選択されなかったら処理中断
    if (event.target.files?.length === 0) {
      return;
    }

    // 画像ファイルでなかったら処理中断
    if (!event.target.files?.[0].type.match("image.*")) {
      return;
    }

    // FileReaderクラスのインスタンスを取得
    const reader = new FileReader();

    // ファイルを読み込み終わったタイミングで実行するイベントハンドラー
    reader.onload = (e) => {
      // imagePreviewに読み込み結果（データURL/バイナリデータ）を代入する
      // imagePreviewに値を入れると<output>に画像が表示される
      console.log(e.target);
      setImagePreview(e.target?.result);
    };

    // ファイル読み込み。読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
    console.log(reader.readAsDataURL(event.target?.files[0]));
  };

  const onChangeFileInputB = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setImagePreviewB(undefined);

    if (event.target.files?.length === 0) {
      return;
    }

    if (!event.target.files?.[0].type.match("image.*")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e.target);
      setImagePreviewB(e.target?.result);
    };

    console.log(reader.readAsDataURL(event.target?.files[0]));
  };

  const router = useRouter();
  const isConfirm = router.query.confirm;

  const methods = useForm({
    mode: "onChange",
    criteriaMode: "all",
  });

  return (
    <div className="wrapper">
      <Header />
      <h1>
        <span className={styles.kaitorititle}>買取受付フォーム</span>
      </h1>
      <div className={styles.image}>
        <Image src="/kaitori.png" alt="kaitori" width={900} height={240} />
      </div>
      <FormProvider {...methods}>
        {isConfirm ? (
          <>
            <PurchaseConfirmation
              imageData={imagePreview}
              imageDataB={imagePreviewB}
            />
          </>
        ) : (
          <>
            <PurchaseForm
              handleChange={onChangeFileInput}
              handleChangeB={onChangeFileInputB}
              imageData={imagePreview}
              imageDataB={imagePreviewB}
            />
          </>
        )}
      </FormProvider>
      <Link href="/" className={styles.link}>
        トップページへ
      </Link>
      <PageTop />
      <Footer />
    </div>
  );
};

export default Purchase;
