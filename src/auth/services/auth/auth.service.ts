import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePassword } from 'src/utils/Bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ) {}

    async validateUser(email: string, password: string) {
        console.log('Inside ValidateUser');
        const userDB = await this.userService.findUserByUsername(email);
        if(userDB) {
           const match = comparePassword(password, userDB.password);
           if(match) {
            console.log('User Validation Success!');
            return userDB;
           } else {
            console.log('Password is not match');
            return null;
           }
        }
        console.log('User Validation Failed!');
        return null;
    }
}
