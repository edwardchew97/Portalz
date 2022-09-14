import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class CreateWalletDto {

	@IsString()
	@IsNotEmpty()
	public near_address: string


	@IsString()
	@IsNotEmpty()
	from_network: string

	@IsString()
	@IsOptional()
	from_address?: string
}
