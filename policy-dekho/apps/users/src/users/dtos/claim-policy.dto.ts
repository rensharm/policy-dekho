import { Length, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class ClaimPolicyDTO {

    @IsNotEmpty({
    })
    policyName: string;

    @Length(8, 20, {
        message: 'Password must be between 8 and 20 characters'
    })
    password: string;

    @IsNotEmpty({
        message: 'Contat Number is required'
    })
    @Length(10,10, {
        message: 'contactNo must be of 10 characters'
    })
    contactNo: string;

    @IsNotEmpty()
    address: string;
}