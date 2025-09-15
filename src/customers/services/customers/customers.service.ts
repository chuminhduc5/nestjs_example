import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
    private customers: Customer[] = [
       { id: 1, name: 'Chử Minh Đức 1', email: 'chuminhduc4623@gmail.com'},
       { id: 2, name: 'Chử Minh Đức 2', email: 'chuminhduc4623@gmail.com'},
    ]

    getCustomers() {
        return this.customers;
    }

    getCustomerById(id: number) {
        return this.customers.find((customer) => customer.id === id);
    }

    createCustomer(customerDto: CreateCustomerDto) {
        return this.customers.push(customerDto);
    }
}
