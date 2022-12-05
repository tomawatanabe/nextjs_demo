import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import LoginPageHeader from "../../components/LoginPageHeader";
import Footer from "../../components/Footer";

export default function Loginpage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const router = useRouter();
  function postCarti() {
    const loginData: { userId: string; userPw: string } = {
      userId: id,
      userPw: pw,
    };

    fetch(`/api/certification`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (!data.cookieId) {
          console.log(data.massage);
        } else {
          console.log(`ユーザー認証完了`);
          document.cookie = `userID=${data.cookieId}; Path=/; max-age=86400s`;
        }
        router.replace("/");
      });
  }

  return (
    <>
      <LoginPageHeader />
      <h3>ログイン</h3>
      <p>メールアドレス</p>
      <input type="text" name="id" value={id} onChange={handleChangeId} />
      <p>パスワード</p>
      <input type="password" name="pw" value={pw} onChange={handleChangePw} />
      <br />
      <input type="button" value="ログイン" onClick={postCarti} />
      <Footer />
    </>
  );
}
