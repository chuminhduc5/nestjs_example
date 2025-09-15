import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateCustomerMiddleware, ValidateCustomerAccountMiddleware, (
      req: Request, res: Response, next: NextFunction
    ) => {
      console.log('Last Middleware');
      next();
    }).exclude(
      {
        path: 'customers/create',
        method: RequestMethod.POST,
      },
      {
        path: 'customers',
        method: RequestMethod.GET,  
      },
    ).forRoutes(CustomersController)
  }
}

// ở đây nếu trong forRoutes viết CustomerController thì tất cả các tuyến đường trong controller để đi qua middle
// hoặc có thể chỉ định tuyến đường cụ thể
// dúng exclude để loại bỏ các tuyền đường k cần đi qua middleware
