import { useEffect, useState } from 'react';

const useAxios = (configObj) => 
{
    const {axiosInstance, url, method, requestConfig} = configObj;

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        var controller = new AbortController();
        const fetchData = async () =>
        {
            try
            {
                var res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal
                });
                console.log("res log", res)
                setResponse(res.data);
            }
            catch(err)
            {
                console.log("error log", err)
                setError(err.message)
            }
            finally
            {
                setLoading(false);
            }
        }

        fetchData();

        return () => controller.abort();

    }, [setResponse, url, setLoading, axiosInstance, method, requestConfig])

    return [response, loading, error];
}

export default useAxios;