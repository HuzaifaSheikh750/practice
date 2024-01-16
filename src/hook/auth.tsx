// import axios from "axios";
import axiosInstance from '../axios/axiosInstance'
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const setToken = (token: any) => {
    localStorage.setItem("token", token);
};

const getToken = () => {
    const token = localStorage.getItem("token");
    if (token)  {
        return token;
    }
    return null;
}

// const getUseremail = () => {
//     const token = getToken();
//     if (token) {
//         const payLoad = jwtDecode(token);
//         return payLoad.email;
//     }
//     return null;
// }

const isLoggedIn = () => {
    const token = getToken();
    if(token){
        const payLoad = jwtDecode(token);
        const isLogin = Date.now() < payLoad.exp * 1000;
        return isLogin;
    }
 }



const getUser = () => {
    return axiosInstance.get("/auth/profile");
}

const logout = () => {
  localStorage.clear();
};


export const authService = { setToken, getToken, isLoggedIn, logout, getUser };





