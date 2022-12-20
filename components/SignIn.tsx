import { useEffect } from "react";
import { useRouter } from "next/router";

const SignIn = ({ children }: any) => {
  const router = useRouter();
  useEffect(() => {
    const cookie = document.cookie;
    if (cookie === "" || undefined) {
      router.push("/login/loginPage");
    }
  }, []);
  //持っていたらそのままページを表示
  return children;
};

export default SignIn;
