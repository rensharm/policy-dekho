import { Length, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class ClaimPolicyDTO {

    @IsNotEmpty({
    })
    policyName: string;

    @IsNotEmpty({})
    claimDate: string;
}