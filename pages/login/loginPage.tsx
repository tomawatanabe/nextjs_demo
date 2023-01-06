import { ChangeEvent, useState } from "react";
import LoginPageHeader from "../../components/LoginPageHeader";
import Footer from "../../components/Footer";
import styles from "../../styles/LogInPage.module.css";
import PageTop from "../../components/pageTop";
import SignCheck from "../../components/signUp/Signcheck";
import Router from "next/router";

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

  function postAPI() {
    const loginData: { userID: string; userPW: string } = {
      userID: id,
      userPW: pw,
    };
    setFlag(false);

    fetch(`/api/getUsers`, {
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
        if (data.datastatus === 404) {
          setFlag(true);
        } else if (data.userID === 9999) {
          Router.push("/adminPage");
          document.cookie = `userID=${data.userID}; Path=/; `;
          document.cookie = `userName=${encodeURI(data.userName)};  Path=/;`;
        } else {
          history.back();
          document.cookie = `userID=${data.userID}; Path=/; `;
          document.cookie = `userName=${encodeURI(data.userName)};  Path=/;`;
        }
      });
  }

  function loginFlag() {
    if (flag === true) {
      return <p className={styles.loginmiss}>ログインできませんでした</p>;
    }
  }

  return (
    <SignCheck>
      <LoginPageHeader />
      <div className={styles.login}>
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
              onClick={postAPI}
            />
          </span>
        </div>
      </div>
      {loginFlag()}
      <PageTop />
      <Footer />
    </SignCheck>
  );
}
