import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from "js-cookie"

const token = Cookies.get("jwt");

const config = {
    headers: {
        "Authorization" : `Bearer ${token}`
    }
}

export const useHttpRequest = url => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

        setIsLoaded(true);
        axios.get(url, config)
        .then(res => {
            setData(res.data);
            setIsLoaded(false);
        })
        .catch(err => {
            setError(err.response.status);
        })

    return {data, isLoaded, error};
};


