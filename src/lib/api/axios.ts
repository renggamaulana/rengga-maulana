import axios from 'axios';

const token = localStorage.getItem('token');
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
            'Authorization': `Bearer ${token}`,
        },
    });
        return res.data;
    } catch (error:any) {
        if (error.response.status === 401) {
            // Server responded with a status other than 2xx
            alert('Unauthenticated: Please log in.');
          } else if (error.request) {
            // Request was made but no response was received
            console.error('Error request:', error.request);
          } else {
            // Something else happened during the setup of the request
            console.error('Error message:', error.message);
          }
          throw error; // Re-throw the error to handle it in the calling function
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

