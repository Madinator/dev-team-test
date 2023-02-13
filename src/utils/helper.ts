import { AxiosResponse } from 'axios';

export function handleAxiosResponse<T>(responsePromise: Promise<TypedResponse<T>>) {
    return responsePromise.then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(response.statusText);
        }
    });
}