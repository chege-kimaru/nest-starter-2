import {
  BelongsTo,
  Column, CreatedAt,
  DataType,
  Default, ForeignKey,
  IsUUID, Model,
  PrimaryKey,
  Table, UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { Role } from './role.model';

@Table({ tableName: 'UserRoles' })
export class UserRole extends Model<UserRole> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @Column
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
