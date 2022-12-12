import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookieOriginal } from "./useCookie";

const SignIn = ({ children }: any) => {
  const cookie = useCookieOriginal();
  const router = useRouter();
  useEffect(() => {
    if (cookie === "userID=" || undefined) {
      router.push("/login/loginPage");
    }
  }, []);
  //持っていたらそのままページを表示
  return children;
};

export default SignIn;
