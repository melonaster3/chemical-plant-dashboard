import axios from "axios";

 const api = axios.create({
   baseURL: "http://localhost:3001/api/data",
});

export const GetData = async (data) => {
    return await api.get(`/`, {
       headers: {
       },
    });
 };
 