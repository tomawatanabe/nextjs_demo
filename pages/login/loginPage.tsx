import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import LoginPageHeader from "../../components/LoginPageHeader";
import Footer from "../../components/Footer";
import styles from "../../styles/LogInPage.module.css";
import PageTop from "../../components/pageTop";

export default function Loginpage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [flag, setFlag] = useState(false);

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const router = useRouter();
  var expire = new Date();
  expire.setTime(expire.getTime() + 1000 * 3600 * 24);

  function postCarti() {
    const loginData: { userId: string; userPw: string } = {
      userId: id,
      userPw: pw,
    };

    setFlag(false);

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
          setFlag(true);
          console.log(flag);
        } else {
          console.log(`ユーザー認証完了`);
          document.cookie =
            `userID=${data.cookieId};  Path=/; expires=` + expire.toUTCString();
          router.replace("/");
        }
      });
  }

  function loginFlag() {
    if (flag === true) {
      return <p className={styles.loginmiss}>ログインできませんでした</p>;
    }
  }

  return (
    <>
      <LoginPageHeader />
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
      {loginFlag()}
      <PageTop />
      <Footer />
    </>
  );
}
