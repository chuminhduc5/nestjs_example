import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}
    @Get()
    getCustomer() {
        return this.customersService.getCustomers();
    }

    @Get(':id')
    getCustomerById(@Param('id', ParseIntPipe) id: number, @Res() res: Response, @Req() req: Request) {
        const customer = this.customersService.getCustomerById(id);
        if (customer) {
            res.send(customer);
        } else {
            res.status(400).send({ mgs: 'Customer not found!' });
        }
    }

    @Get('/search/:id')
    searchCustomerById(@Param('id', ParseIntPipe) id: number) {
        const customer = this.customersService.getCustomerById(id);
        if(customer) return customer;
        else throw new HttpException('Customer not found!', HttpStatus.BAD_REQUEST);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        console.log(createCustomerDto);
        this.customersService.createCustomer(createCustomerDto);
    }
}
