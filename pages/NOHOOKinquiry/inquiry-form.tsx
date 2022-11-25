import Link from "next/link";
import { ChangeEvent, useState } from "react";

const InquiryForm = () => {
  type FormData = {
    lastName: string;
    firstName: string;
    kanaLastName: string;
    kanaFirstName: string;
    phoneNumber: string;
    email: string;
  };

  const [formDatas, setFormDatas] = useState<FormData>({
    lastName: "",
    firstName: "",
    kanaLastName: "",
    kanaFirstName: "",
    phoneNumber: "",
    email: "",
  });

  const [textAreaData, setTextAreaData] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
  };

  const handleInputChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaData(e.target.value);
  };

  return (
    <>
      <form>
        <h1>お問い合わせフォーム</h1>
        <h2>
          <span>お客様情報を入力してください。</span>
        </h2>
        <label htmlFor="inquiry-name">
          氏名<span>*必須</span>
        </label>
        <input
          type="text"
          placeholder="山田"
          id="inquiry-name"
          name="lastName"
          value={formDatas.lastName}
          onChange={handleInputChange}
          required
        ></input>
        <input
          type="text"
          placeholder="太郎"
          name="firstName"
          value={formDatas.firstName}
          onChange={handleInputChange}
        ></input>
        <br />
        <label htmlFor="inquiry-kana-name">
          氏名（フリガナ）<span>*必須</span>
        </label>
        <input
          type="text"
          placeholder="ヤマダ"
          id="inquiry-kana-name"
          name="kanaLastName"
          value={formDatas.kanaLastName}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="タロウ"
          name="kanaFirstName"
          value={formDatas.kanaFirstName}
          onChange={handleInputChange}
        ></input>
        <br />
        <label htmlFor="inquiry-phoneNumber">
          電話番号<span>*必須</span>
        </label>
        <input
          type="tel"
          placeholder="03-1234-5678"
          id="inquiry-phoneNumber"
          name="phoneNumber"
          value={formDatas.phoneNumber}
          onChange={handleInputChange}
        ></input>
        <br />
        <label htmlFor="inquiry-mail">
          メールアドレス<span>*必須</span>
        </label>
        <input
          type="mail"
          placeholder="sample@sample.co.jp"
          id="inquiry-mail"
          name="email"
          value={formDatas.email}
          onChange={handleInputChange}
        ></input>
        <br />
        <h2>
          <span>お問い合わせ内容を入力してください。</span>
        </h2>
        <label htmlFor="inquiry-content">
          お問い合わせ内容<span>*必須</span>
        </label>
        <textarea
          id="inquiry-content"
          placeholder="お問い合わせ内容を入力してください"
          name="phoneNumber"
          value={textAreaData}
          onChange={handleInputChangeTextArea}
        ></textarea>
        <br />

        <div className="button001">
          {/* <input type="submit"> */}
            <Link href="http://localhost:3000/inquiry/inquiry-check">
              入力内容の確認画面へ
            </Link>
          {/* </input> */}
        </div>
      </form>
    </>
  );
};

export default InquiryForm;
