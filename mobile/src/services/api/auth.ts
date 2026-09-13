import api from "./client";

export const login=async (email:string,password:string)=>{
    const user={
        email,
        password
    }
    const response = await api.post("/auth/login", user);
    return response.data;
}