import { Response } from "express";
import { ResponseType } from "../types/response";

export class ApiResponse implements ResponseType {
    statusCode: number;
    isSuccess: boolean;
    message: string;
    data: any;

    constructor() {
        this.statusCode = 200; // Default to 200 OK
        this.isSuccess = true;
        this.message = '';
        this.data = null;
    }

    success(message: string, data?: any, statusCode = 200) {
        this.isSuccess = true;
        this.message = message || 'Request successful';
        this.data = data || null;
        this.statusCode = statusCode;
        return this;
    }

    error(message: string, data?: any, statusCode = 400) {
        this.isSuccess = false;
        this.message = message || 'An error occurred';
        this.data = data || null;
        this.statusCode = statusCode;
        return this;
    }

    send(res: Response) {
        const response: any = {};

        if (this.isSuccess !== undefined) response.success = this.isSuccess;
        if (this.message) response.message = this.message;
        if (this.data !== null) response.data = this.data;

        res.status(this.statusCode).json(response);
    }
}

const response = new ApiResponse();

export default response