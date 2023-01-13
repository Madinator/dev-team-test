import { defineStore } from 'pinia';
import { type Person, userApiService } from '@/services/api/user/index';
interface State {
    person: Person,
    people: Person[],
}

export const useUserStore = defineStore({
    id: 'UserStore',
    state: (): State => ({
        person: {
            Id: '',
            Name: '',
            Title: '',
            Photo: '',
            Tags: [],
            Attention: [],
            Profit: []
        },
        people: [
            {
                Id: '',
                Name: '',
                Title: '',
                Photo: '',
                Tags: [],
                Attention: [],
                Profit: []
            }
        ]
    }),
    actions: {
    }
})