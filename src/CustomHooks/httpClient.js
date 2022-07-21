import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from "js-cookie"

const token = Cookies.get('jwt');

const config = {
    headers: {
        "Authorization" : `Bearer ${token}`
    }
}



export const useHttpClient = url => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const signal = controller.signal;
        setIsLoaded(true);

        axios.get(url, {
            signal: controller.signal,
            ...config
        })
        .then(res => {
            setData(res.data);
            setIsLoaded(false);
        })
        .catch(err => {
            setError(err.response?.status);
        })
        return () => {
            controller.abort();
        }
    }, [url])

    return {data, isLoaded, error};
};


