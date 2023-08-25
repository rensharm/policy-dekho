import { IsNotEmpty } from "class-validator";

export class CreatePolicyDTO {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    category: string;
    @IsNotEmpty()
    premium: number;
    @IsNotEmpty()
    sumAssured: number;
    @IsNotEmpty()
    provider: string;
    @IsNotEmpty()
    tenure: number;
}