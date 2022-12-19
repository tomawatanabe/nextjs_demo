import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookieOriginal, useCookie } from "../useCookie";

const SignCheck = ({ children }: any) => {
  const cookie = useCookie();
  const router = useRouter();

  useEffect(() => {
    if (cookie === "" || undefined) {
      //持っていなかったらそのままページを表示
    } else {
      router.push("/");
    }
  });
  return children;
};

export default SignCheck;
