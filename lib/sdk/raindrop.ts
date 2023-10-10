import { RaindropApiResponse } from '@/types/data/raindrops'
import { AxiosApi as AxiosApi } from './axios'


export class RaindropsApi extends AxiosApi {

    constructor(baseURL: string, token: string) {
        super({
            baseURL,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    async getCollectionRaindropsData(
        collectionID: string | number,
        search?: string,
        page: string | number = 0,
        perPage: string | number = 50,
    ) {
        const { data } = await this.api.get<RaindropApiResponse>(
            `raindrops/${collectionID}`,
            {
                params: {
                    search,
                    page,
                    perPage,
                }
            }
        )
        return data
    }
}