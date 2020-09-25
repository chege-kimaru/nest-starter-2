import {
  AutoIncrement,
  Column, CreatedAt, DataType, Default,
  Model, NotNull,
  PrimaryKey,
  Table, Unique, UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'EmailSubscriptions' })
export class EmailSubscription extends Model<EmailSubscription> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: string;

  @Unique
  @NotNull
  @Column({ allowNull: false })
  email: string;

  @NotNull
  @Default(DataType.UUIDV4)
  @Column({ allowNull: false, type: DataType.UUIDV4 })
  token: string;

  @NotNull
  @CreatedAt
  @Column({ allowNull: false })
  createdAt: Date;

  @NotNull
  @UpdatedAt
  @Column({ allowNull: false })
  updatedAt: Date;
}
