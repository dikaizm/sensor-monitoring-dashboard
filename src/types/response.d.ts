import { Response } from "express"
import { AppResponse } from "../utils/response"

export interface ApiResponse {
    statusCode: number
    isSuccess: boolean
    message: string
    data: any | null
    success(message: string, data: any, statusCode?: number): ApiResponse
    error(message: string, data: any, statusCode?: number): ApiResponse
    send(res: Response): void
}