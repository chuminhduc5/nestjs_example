import { IsEmail, IsNotEmpty, IsNotEmptyObject, isNotEmptyObject, IsNumberString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddress.dto";
import { Type } from "class-transformer";

export class CreateCustomerDto {
    @IsNumberString()
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    // Xác thực lồng nhau
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;
}