import {
  BelongsTo,
  Column, CreatedAt,
  DataType,
  Default, ForeignKey,
  IsUUID,
  Model, NotNull,
  PrimaryKey,
  Table, UpdatedAt,
} from 'sequelize-typescript';
import { Payment } from './payment.model';

@Table({ tableName: 'RavePayments' })
export class RavePayment extends Model<RavePayment> {
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

  @ForeignKey(() => Payment)
  paymentId: string;

  @BelongsTo(() => Payment)
  payment: Payment;

  @Column
  txId: string;

  @Column
  txRef: string;

  @Column
  flwRef: string;

  @Column
  orderRef: string;

  @Column
  raveRef: string;

  @Column
  accountId: string;

  @Column
  accountName: string;

  @Column
  ravePaymentId: string;

  @Column
  paymentType: string;

  @Column
  customerName: string;

  @Column
  customerEmail: string;

  @Column
  customerPhone: string;

  @Column
  created: string;

  @Column
  status: string;

  @Column
  cardType: string;

  @NotNull
  @CreatedAt
  @Column({ allowNull: false })
  createdAt: Date;

  @NotNull
  @UpdatedAt
  @Column({ allowNull: false })
  updatedAt: Date;
}
