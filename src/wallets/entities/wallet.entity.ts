import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Wallet {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 32 })
	from_network: string;

	@Index()
	@Column({ length: 128 })
	from_address: string;

	@Index()
	@Column({ length: 128 })
	near_address: string;

	@Index()
	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	created_at: Date;

	@Index()
	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	updated_at: Date;
}
