import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

const SignIn = ({ children }: any) => {
  const signIn = Cookies.get("cookie_name");
  console.log("Cookies.get is " + Cookies.get())
  console.log("signIn is " + signIn);
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
