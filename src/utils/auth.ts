import axios from "axios";

export const fetchWithAuth = async (url:string, options :any ={}) => {
    const token = localStorage.getItem('token');
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    const res = await axios.get(url, { ...options, headers });
    return res.data;
};