import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor(private usersService: UserService) {
    }

    async use(req: any, res: Response, next: Function) {
        try {
            const user = await this.usersService.findUserById(req.params.userId);
            if (user?.id) {
                req.User = user;
                next();
            } else {
                throw new NotFoundException('This user does not exist');
            }
        } catch (e) {
            throw e;
        }
    }
}