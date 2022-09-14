export default class CommonResponse<DTO> {
	message: string
	statusCode: number
	response: DTO
}