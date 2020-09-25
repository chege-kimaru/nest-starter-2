import {
  Column, CreatedAt,
  DataType,
  Default, HasOne,
  IsUUID,
  Model, NotNull,
  PrimaryKey,
  Table, UpdatedAt,
} from 'sequelize-typescript';
import { Donation } from '../../donation/donation.model';

@Table({ tableName: 'Payments' })
export class Payment extends Model<Event> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column
  id: string;

  @NotNull
  @Column({ allowNull: false })
  currency: string;

  @NotNull
  @Column({ type: DataType.DECIMAL(20, 2), allowNull: false })
  amount: number;

  @NotNull
  @CreatedAt
  @Column({ allowNull: false })
  createdAt: Date;

  @NotNull
  @UpdatedAt
  @Column({ allowNull: false })
  updatedAt: Date;

  @HasOne(() => Donation)
  donation: Donation[];
}
