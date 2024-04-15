export interface ResponseType {
    statusCode: number;
    isSuccess: boolean;
    message: string;
    data: any | null;
}

export interface ErrorResponse {
    message?: string
    statusCode?: number
}