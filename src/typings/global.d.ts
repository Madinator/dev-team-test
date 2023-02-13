declare interface TypedResponse<T=any> extends Response {
    data: any;
    json<P = T>(): Promise<P>;
}

declare interface TypedError<T=any> extends Error {
    data: any;
    json<P = T>(): Promise<P>;
}