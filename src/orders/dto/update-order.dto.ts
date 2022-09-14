import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderInputDto } from './create-order-input.dto';

export class UpdateOrderDto extends PartialType(CreateOrderInputDto) {}
