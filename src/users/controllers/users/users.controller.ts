import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService) {}

    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/username/:username')
    getUserByUserName(@Param('username') username: string) {
        const user = this.usersService.getUserByUsername(username);
        if(user) return new SerializedUser(user);
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(HttpExceptionFilter)
    @Get('id/:id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = this.usersService.getUserById(id); 
        if(user) return new SerializedUser(user);
        else {
            throw new UserNotFoundException();
        }
    }

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }
}
