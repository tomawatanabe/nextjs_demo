import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SignIn = ({ children }: any) => {
  const signIn = document.cookie;
  const router = useRouter();
  useEffect(() => {
    if (!signIn === true) {
      console.log("ユーザー認証失敗");
      router.push("/login/loginPage");
    }
  }, []);
  //持っていたらそのままページを表示
  return children;
};

export default SignIn;
