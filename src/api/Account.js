
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("jwt");

const BASE_URL = "https://admission-front.azurewebsites.net/api/StudentInfo/";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`
    }
}) 