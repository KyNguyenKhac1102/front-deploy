import { useEffect, useState } from 'react';

const useAxiosFunction = () => 
{
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [controller, setController] = useState();

    const axiosFetch = async (configObj) => {
        const {axiosInstance, url, method, requestConfig, setToastState} = configObj;
        try
        {
            setLoading(true);
            var ctrl = new AbortController();
            setController(ctrl);
            var res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            if(method === "DELETE" || method === "POST")
            {
                setToastState({
                    open: true,
                    message: res.data.message,
                    type: "success"
                })
            }
            setResponse(res.data);
        }
        catch(err)
        {
            if(method === "DELETE" || method === "POST")
            {
                setToastState({
                    open: true,
                    message: "Error message from server!! " + error.response?.status + " ERROR",
                    type: "error"
                })
            }
            setError(err)
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() => {
        
        return () => controller && controller.abort();

    }, [controller])

    return [response, loading, error, axiosFetch];
}

export default useAxiosFunction;