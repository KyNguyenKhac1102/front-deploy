
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("jwt");

const BASE_URL = "https://admission1-api.azurewebsites.net/api/Auth";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`
    }
}) 