import axios from 'axios';

// Fungsi untuk mendapatkan data
const getBlogs = async () => {
    const api_url = 'http://localhost:8000/api/blogs';

    try {
        const res = await axios.get(api_url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'cache-control': 'no-cache',
        },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

const postBlogs = async (blog: any) => {
    const api_url = 'http://localhost:8000/api/blogs';
    try {
        const res = await axios.post(api_url, blog ,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'method': 'POST',
        },
        });
        return res.data;
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
}


const getCategories = async () => {
    const api_url = 'http://localhost:8000/api/categories';

    try {
        const res = await axios.get(api_url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'cache-control': 'no-cache',
        },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};


export {getBlogs, getCategories, postBlogs}

