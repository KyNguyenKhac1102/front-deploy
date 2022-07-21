import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from "js-cookie"

const token = Cookies.get("jwt");

const configDefault = {
    headers: {
        "Authorization" : `Bearer ${token}`,
        'cache': false,
        'Content-Type' : false,
        'processData': false,
        'Access-Control-Allow-Origin': '*',
        'crossDomain' : true,
    }
}

export const useHttpClientPost = (url, postData, config = configDefault) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    axios.post(url, postData, config)
    .then(res => {
        setIsLoaded(true);
        setData(res.data);
        })
    .catch(err => {
        setError(err.response.status);
    })
    return {data, isLoaded, error};
};


