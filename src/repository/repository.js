import axios from "axios";
//export const BaseURL = 'https://m-server-5449.onrender.com';
export const BaseURL ='http://localhost:3001';

const axiosInstance = axios.create({
    baseURL: BaseURL,
    withCredentials: true
});


const checkConnection = async () => {
    try {
        const response = await axiosInstance.get('/ping');
        console.log('Connection successful:', response.data);
    } catch (error) {
        console.error('Connection failed:', error);
    }
};

checkConnection(); 

export default axiosInstance;



//mahaluxmi-hardwear
