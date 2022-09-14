import { IsString, IsNotEmpty } from "class-validator"
import { Crypto } from "src/common/constants"

export class GetRateDto {
	@IsString()
	@IsNotEmpty()
	crypto: Crypto
}
