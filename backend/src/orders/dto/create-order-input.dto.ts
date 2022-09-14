import { IsString, IsNotEmpty } from "class-validator"

export class CreateOrderInputDto {

	@IsString()
	@IsNotEmpty()
	from_network: string

	to_network?: string

	from_amount?: string

	to_amount?: string

	@IsString()
	@IsNotEmpty()
	to_address: string
}
