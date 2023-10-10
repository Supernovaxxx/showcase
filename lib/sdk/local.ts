'use client'

import { ReferenceListApiResponse } from "@/types/api"
import { AxiosApi } from "./axios"


export class LocalApi extends AxiosApi {

    async getReferencesData(
        search?: string,
        page: number = 0,
    ) {
        const { data } = await this.api.get<ReferenceListApiResponse>(
            '/api/references',
            {
                params: {
                    search,
                    page,
                }
            }
        )
        return data
    }
}
