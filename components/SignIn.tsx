import { useEffect } from "react";
import { useRouter } from "next/router";

const SignIn = ({ children }: any) => {
  const router = useRouter();
  useEffect(() => {
    const signIn = document.cookie;
    if (signIn === "userID" || undefined) {
      console.log("ユーザー認証失敗");
      router.push("/login/loginPage");
    }
  }, []);
  //持っていたらそのままページを表示
  return children;
};

export default SignIn;
