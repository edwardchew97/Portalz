import { STATUS } from "src/common/constants";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Order {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 16 })
	from_network: string

	@Column({ length: 128 })
	deposit_address: string

	@Column({ length: 16 })
	to_network: string

	@Column({ length: 128 })
	to_address: string

	@Column({ length: 64, nullable: true })
	from_amount?: string

	@Column({ length: 64, nullable: true })
	to_amount?: string

	@Column({ length: 128, nullable: true })
	transaction_hash?: string

	@Column({ length: 32, default: STATUS.PENDING })
	status?: string

	@Index()
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	created_at: Date;

	@Index()
	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	updated_at: Date;
}