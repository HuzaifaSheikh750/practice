import React, { useEffect } from 'react'
import { authService } from "../hook/auth";
import  AxiosInstance  from '../axios/axiosInstance'
import axios from 'axios';

const Home = () => {
    const [data, setData] = React.useState([]);

    const getData = async () => {
        try {
           const response = await AxiosInstance.get(`https://api.escuelajs.co/api/v1/auth/profile`);
            //   console.log(response.data);
                setData(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    

  return (
    <>
    <h1>{data.email}</h1>
    {/* <button onClick={getData}>Login</button> */}
    </>
  )
}

export default Home