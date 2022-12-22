import SignIn from "../../../components/SignIn";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import useSWR from "swr";

const fetcher = (resource: RequestInfo | URL, init: RequestInit | undefined) =>
  fetch(resource, init).then((res) => res.json());


const UserImfo = () => {

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/myPage/getUserImfo`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <SignIn>
        <Header />
        <h1>お客様情報</h1>
        <h2>
          <span>お客様情報を確認してください。</span>
        </h2>
        <hr />
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名（姓）
          </label>
          {data?.last_name}
        </div>
        <div>
          <label htmlFor="lastName">
            <span className="label-fit label-danger">必須</span>氏名（名）
          </label>
          {data?.first_name}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ姓）
          </label>
          {data?.kana_last_name}
        </div>
        <div>
          <label htmlFor="kanaLastName">
            <span className="label-fit label-danger">必須</span>氏名（カナ名）
          </label>
          {data?.kana_first_name}
        </div>
        <div>
          <div>
            <label htmlFor="phoneNumber">
              <span className="label-fit label-danger">必須</span>電話番号
            </label>
            {data?.phone}
          </div>
        </div>
        <div>
          <label htmlFor="mail">
            <span className="label-fit label-danger">必須</span>メールアドレス
          </label>
          {data?.email}
        </div>
        <div>
          <label htmlFor="postCode">
            <span className="label-fit label-danger">必須</span>郵便番号
          </label>
          {data?.zip_code}
        </div>
        <div>
          <label htmlFor="prefecture">
            <span className="label-fit label-danger">必須</span>都道府県
          </label>
          {data?.prefecture}
        </div>
        <div>
          <label htmlFor="city">
            <span className="label-fit label-danger">必須</span>市区町村
          </label>
          {data?.city}
        </div>

        <div>
          <label htmlFor="address">
            <span className="label-fit label-danger">必須</span>番地
          </label>
          {data?.address}
        </div>
        <div>
          <label htmlFor="building">
            <span className="label-fit label-warning">任意</span>建物名
          </label>
          {data?.building}
        </div>
        <div>
          <label htmlFor="password">
            <span className="label-fit label-danger">必須</span>パスワード
          </label>
          {data?.password}
        </div>

        <Link href="/mypage">マイページに戻る</Link>
        <Link href="/mypage/userimfo/useredit" className="userinfoa">
          会員情報を編集する
        </Link>

        <Footer />
      </SignIn>
    </>
  );
};

export default UserImfo;
