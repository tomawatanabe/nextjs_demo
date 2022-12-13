import { useEffect, useState } from "react";

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
