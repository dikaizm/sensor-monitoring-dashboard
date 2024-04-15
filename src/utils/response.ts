import { Response } from "express";

class AppResponse {
    statusCode: number;
    isSuccess: boolean;
    message: string;
    data: any | null;

    constructor() {
        this.statusCode = 200; // Default to 200 OK
        this.isSuccess = true;
        this.message = '';
        this.data = null;
    }

    success(message: string, data: any, statusCode = 200) {
        this.isSuccess = true;
        this.message = message || 'Request successful';
        this.data = data || null;
        this.statusCode = statusCode;
        return this;
    }

    error(message: string, data: any, statusCode = 400) {
        this.isSuccess = false;
        this.message = message || 'An error occurred';
        this.data = data || null;
        this.statusCode = statusCode;
        return this;
    }

    send(res: Response) {
        res.status(this.statusCode).json({
            success: this.isSuccess,
            message: this.message,
            data: this.data
        });
    }
}

const response = new AppResponse();

export default response