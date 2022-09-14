import { IsString, IsNotEmpty } from "class-validator"

export class VerifyOrderDto {

	@IsString()
	@IsNotEmpty()
	transaction_hash: string
}
