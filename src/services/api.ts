import axios from "services/axios.customize"


export const loginAPI = (username: string, password: string) => {
    const urlBackEnd = "/api/v1/auth/login"
    return axios.post<IBackendRes<ILogin>>(urlBackEnd, { username, password })
}

export const registerAPI = (values: { [key: string]: any }) => {
    const urlBackEnd = "/api/v1/user/register"
    return axios.post<IBackendRes<IRegister>>(urlBackEnd, values)
}