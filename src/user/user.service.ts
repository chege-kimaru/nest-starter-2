import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/auth/model/role.model';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll({ include: [{ model: Role }], attributes: { exclude: ['password'] } });
  }

  findUserById(id: string): Promise<User> {
    return this.userModel.findByPk(id, { include: [{ model: Role }], attributes: { exclude: ['password'] } });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      include: [{ model: Role }], attributes: { exclude: ['password'] },
      where: {
        email,
      },
    });
  }
}
