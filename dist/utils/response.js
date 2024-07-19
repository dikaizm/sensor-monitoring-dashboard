"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor() {
        this.statusCode = 200; // Default to 200 OK
        this.isSuccess = true;
        this.message = '';
        this.data = null;
    }
    success(message, data, statusCode = 200) {
        this.isSuccess = true;
        this.message = message || 'Request successful';
        this.data = data || null;
        this.statusCode = statusCode;
        return this;
    }
    error(message, data, statusCode = 400) {
        this.isSuccess = false;
        this.message = message || 'An error occurred';
        this.data = data || null;
        this.statusCode = statusCode;
        return this;
    }
    send(res) {
        const response = {};
        if (this.isSuccess !== undefined)
            response.success = this.isSuccess;
        if (this.message)
            response.message = this.message;
        if (this.data !== null)
            response.data = this.data;
        res.status(this.statusCode).json(response);
    }
}
exports.ApiResponse = ApiResponse;
const response = new ApiResponse();
exports.default = response;
