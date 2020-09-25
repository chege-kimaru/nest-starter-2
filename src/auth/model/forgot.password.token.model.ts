import {
  AllowNull,
  Column, CreatedAt, DataType, Default, ForeignKey, IsUUID, Model,
  PrimaryKey,
  Table, Unique, UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';

@Table({ tableName: 'ForgotPasswordTokens' })
export class ForgotPasswordToken extends Model<ForgotPasswordToken> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column
  id: string;

  @Unique(true)
  @ForeignKey(() => User)
  @IsUUID(4)
  @AllowNull(false)
  @Column
  userId: string;

  @AllowNull(false)
  @Column
  token: string;

  @AllowNull(false)
  @Column
  expiry: Date;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}

