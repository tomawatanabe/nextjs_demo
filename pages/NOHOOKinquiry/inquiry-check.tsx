import Link from "next/link";

const InquiryForm = () => {
  return (
    <>
      <form>
        <h2>お問い合わせ内容を確認してください</h2>
        <label htmlFor="inquiry-name">
          氏名<span>*必須</span>
        </label>
        <input type="text" placeholder="山田" id="inquiry-name"></input>
        <input type="text" placeholder="太郎"></input>
        <br />
        <label htmlFor="inquiry-kana-name">
          氏名（フリガナ）<span>*必須</span>
        </label>
        <input type="text" placeholder="ヤマダ" id="inquiry-kana-name"></input>
        <input type="text" placeholder="タロウ"></input>
        <br />
        <label htmlFor="inquiry-phoneNumber">
          電話番号<span>*必須</span>
        </label>
        Ï
        <input
          type="tel"
          placeholder="ハイフンなしで入力"
          id="inquiry-phoneNumber"
        ></input>
        <br />
        <label htmlFor="inquiry-mail">
          メールアドレス<span>*必須</span>
        </label>
        <input
          type="mail"
          placeholder="sample@sample.co.jp"
          id="inquiry-mail"
        ></input>
        <br />
        <label htmlFor="inquiry-content">
          お問い合わせ内容<span>*必須</span>
        </label>
        <textarea
          id="inquiry-content"
          placeholder="お問い合わせ内容を入力してください"
        ></textarea>
        <br />
        <p className="back-btn">
          <Link href="http://localhost:3000/inquiry/inquiry-form">
            入力内容を修正する
          </Link>
        </p>
        <div className="button001">
          <Link
            href="/"
            onClick={() => alert("お問い合わÏせ内容を送信しました")}
          >
            お問い合わせ内容を送信する
          </Link>
        </div>
      </form>
    </>
  );
};

export default InquiryForm;
