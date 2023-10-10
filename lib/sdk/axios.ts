import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults, } from "axios";


export class AxiosApi {
    api: AxiosInstance

    constructor(config: CreateAxiosDefaults = {}) {
        this.api = axios.create(config)

        this.api.interceptors.request.use(null, function (error) {
            // TODO: Improve general error handling algorithm

            if (axios.isAxiosError(error)) {
                console.log(error.message)
            } else {
                error = new AxiosError('An unexpected error occurred')
            }

            return Promise.reject(error as AxiosError)
        })
    }
}