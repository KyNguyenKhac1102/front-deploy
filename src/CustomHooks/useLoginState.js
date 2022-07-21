import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

async function getLoginState() {
    const jwt = Cookies.get("jwt");
    if (!jwt) return [false, null];
    const resp = await axios.get("https://localhost:7210/login/cookie", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return [true, resp.data];
  }

export default function useLoginState() {
    const [loginState, setLoginState] = useState(undefined);
    useEffect(() => {
      getLoginState().then(setLoginState);
    }, []);
    return loginState;
  }
