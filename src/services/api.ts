import axios from "services/axios.customize"


export const loginAPI = (values: { [key: string]: any }) => {
    const urlBackEnd = "/api/v1/auth/login"
    return axios.post<IBackendRes<ILogin>>(urlBackEnd, values, {
        headers: {
            delay: 2000
        }
    })
}

export const registerAPI = (values: { [key: string]: any }) => {
    const urlBackEnd = "/api/v1/user/register"
    return axios.post<IBackendRes<IRegister>>(urlBackEnd, values)
}

export const fetchAccountAPI = () => {
    const urlBackEnd = "/api/v1/auth/account"
    return axios.get<IBackendRes<IFetchAccount>>(urlBackEnd, {
        headers: {
            delay: 1000
        }
    })
}

export const logoutAPI = () => {
    const urlBackEnd = "/api/v1/auth/logout"
    return axios.post<IBackendRes<IRegister>>(urlBackEnd)
}

export const getUserAPI = (query: string) => {
    const urlBackEnd = `/api/v1/user?${query}`
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackEnd)
}

export const createUserAPI = (values: { [key: string]: any }) => {
    const urlBackEnd = "/api/v1/user"
    return axios.post<IBackendRes<IRegister>>(urlBackEnd, values)
}


export const createUserBulkAPI = (values: {
    fullName: string,
    password: string,
    email: string,
    phone: string
}[]) => {
    const urlBackEnd = "/api/v1/user/bulk-create"
    return axios.post<IBackendRes<IResponeImport>>(urlBackEnd, values)
}