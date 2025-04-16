import axios from "axios";

// 创建 Axios 示例
const myAxios = axios.create({
    baseURL: "http://localhost:8101",
    timeout: 10000,
    withCredentials: true,
});

// Request Interceptors
myAxios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Response Interceptors
myAxios.interceptors.response.use(
    // 2xx response
    function (response) {
        // handle response data
        const { data } = response;
        // unsuccessful login
        if (data.code === 40100) {
            //go to login page if the current page is not login page or api getting user's details
            if (
                !response.request.responseURL.includes("user/get/login") &&
                !window.location.pathname.includes("/user/login")
            ) {
                window.location.href = `/user/login?redirect=${window.location.href}`;
            }
        } else if (data.code !== 0) {
            // other errors
            throw new Error(data.message ?? "Server Error");
        }
        return data;
    },
    // not 2xx response
    function (error) {
        // handle errors
        return Promise.reject(error);
    },
);

export default myAxios;
