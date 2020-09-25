import {
  IsEmail,
  Column, CreatedAt,
  DataType,
  Default, IsUUID,
  Model,
  PrimaryKey,
  Table, Unique, UpdatedAt, BelongsToMany, HasOne, AllowNull, HasMany,
} from 'sequelize-typescript';
import { Role } from '../auth/model/role.model';
import { UserRole } from '../auth/model/user.role.model';
import { EmailVerificationToken } from '../auth/model/email.verification.token.model';
import { ForgotPasswordToken } from '../auth/model/forgot.password.token.model';

@Table({ tableName: 'Users' })
export class User extends Model<User> {

  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  image: string;

  @Unique
  @IsEmail
  @Column
  email: string;

  @Default(false)
  @AllowNull(false)
  @Column
  emailVerified: boolean;

  @Column
  password: string;

  @Column
  provider: string;

  @Column
  providerId: string;

  @Column
  phone: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Array<Role & { UserRole: UserRole }>;

  @HasOne(() => EmailVerificationToken)
  emailVerificationToken: EmailVerificationToken;

  @HasOne(() => ForgotPasswordToken)
  forgotPasswordToken: ForgotPasswordToken;
}
