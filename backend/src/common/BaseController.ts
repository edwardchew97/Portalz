import CommonResponse from "./CommonResponse";

export class BaseController {
	response<T>(statusCode: number, message: string, response: T): CommonResponse<T> {
		return { statusCode, message, response }
	}
}