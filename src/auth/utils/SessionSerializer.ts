import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm";
import { UsersService } from "src/users/services/users/users.service";

export class SessionSerializer extends PassportSerializer {

    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService) {
        super();
    }

    serializeUser(user: User, done: (err: Error | null , user: User | null) => void) {
        console.log('SerializeUser')
        done(null, user);
    }

    async deserializeUser(user: User, done: (err: Error | null, user: User | null) => void) {
        console.log('DeserializeUser')
        const userDB = await this.userService.findUserById(user.id);
        return userDB ? done(null, userDB) : done(null, null);
    }
}