import { httpService } from '@/services/http/http.service';

export const taskApiService = {
    getTodosList: async (): Promise<TypedResponse<any>> => {
        return await httpService.get(`todos`)
    },
   
}