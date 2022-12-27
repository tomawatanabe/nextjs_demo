import { useEffect, useState } from "react";

export const useCookie = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    //cookie全体(ID,Name)を取得
    const cookies = document.cookie;

    if (!cookies) {
      return undefined;
    } else {
      //[userID=num,useName=~~]の配列にして返す
      const cookiesArray = cookies.split("; ");

      //userID=numを取り出す
      const cookie = cookiesArray.filter(function (cookie) {
        return cookie.includes("userID");
      });

      //userID=numを[userID,num]の配列にしてnumの値をstateにセットする
      const cookieArray = cookie[0].split("=");
      setState(cookieArray[1]);
    }
  });
  return state;
};

export const useCookieOriginal = () => {
  const [cookieOriginal, setCookieOriginal] = useState("");

  useEffect(() => {
    const cookies = document.cookie;
    if (!cookies) {
      undefined;
    } else {
      const cookiesArray = cookies.split("; ");

      const cookieArray = cookiesArray.filter(function (cookie) {
        return cookie.includes("userID");
      });
      const cookie = cookieArray[0];

      setCookieOriginal(cookie);
    }
  });
  return cookieOriginal;
};

export const useName = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    const cookies = document.cookie;
    if (!cookies) {
      return undefined;
    } else {
      const cookiesArray = cookies.split("; ");

      const cookie = cookiesArray.filter(function (cookie) {
        return cookie.includes("userName");
      });
      const cookieArray = cookie[0].split("=");

      setState(cookieArray[1]);
    }
  });
  return state;
};
