import {
  AllowNull,
  Column, CreatedAt, DataType, Default, ForeignKey, IsUUID, Model,
  PrimaryKey,
  Table, Unique, UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/user.model';

@Table({ tableName: 'EmailVerificationTokens' })
export class EmailVerificationToken extends Model<EmailVerificationToken> {
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

