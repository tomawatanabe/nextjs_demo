import { useEffect, useState } from "react";

export const useCookie = () => {
  const [state, setState] = useState("");

  useEffect(() => {
    const cookies = document.cookie;
    if (!cookies) {
      undefined;
    } else {
      const cookiesArray = cookies.split("; ");

      const cookie = cookiesArray.filter(function (cookie) {
        return cookie.includes("userID");
      });
      const cookieArray = cookie[0].split("=");

      setState(cookieArray[1]);
    }
  });
  return state;
};
