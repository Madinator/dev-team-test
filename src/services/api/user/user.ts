import { httpService } from '@/services/http/http.service';
import type { Person } from './model';

export const userApiService = {
    getPeopleById: async (id: string): Promise<TypedResponse<Person>> => {
        return await httpService.get(`people`, {id: id})
    },
    getPeople: async (): Promise<TypedResponse<Person[]>> => {
        return await httpService.get(`people`, {})
    },
}