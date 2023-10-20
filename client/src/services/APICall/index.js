import axios from "axios";

 const api = axios.create({
   baseURL: "http://localhost:3001/api/data",
});

// Http call to get data from backend
export const GetData = async (data) => {
    return await api.get(`/`, {
       headers: {
       },
    });
 };
 