import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/LogInPage.module.css";

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
      <Header />
      <div className={styles.login}>
        {/* <h3 className={styles.login_header}>ログイン</h3> */}
        <div className={styles.login_container}>
          <p>メールアドレス</p>
          <input
            placeholder="sample@example.com"
            type="text"
            name="id"
            value={id}
            onChange={handleChangeId}
            />
          <p>パスワード</p>
          <input
            type="password"
            placeholder="Password"
            name="pw"
            value={pw}
            onChange={handleChangePw}
            />
          <br />
          <span>
            <input
              className={styles.login_btn}
              type="button"
              value="ログイン"
              onClick={postCarti}
            />
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
}
