import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    private users: User[] = [
        { id: 1, username: "Minh", password: "123456" },
        { id: 2, username: "Chử Minh Đức1", password: "123456" },
        { id: 3, username: "Chử Minh Đức2", password: "123456" },
        { id: 4, username: "Chử Minh Đức3", password: "123456" },
        { id: 5, username: "Chử Minh Đức4", password: "123456" },
    ];

    getUsers() {
        // Cách 1: return this.users.map((user) => plainToClass(SerializedUser, user));
        // Cách 2:
        return this.users.map((user) => new SerializedUser(user));
    }

    getUserByUsername(username: string) {
        return this.users.find((user) => user.username === username);
    }

    getUserById(id: number) {
        return this.users.find((user) => user.id === id);
    }

    createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
}
