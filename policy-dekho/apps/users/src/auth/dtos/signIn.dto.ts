import { Length, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";

export class SignInDTO {

    @IsNotEmpty({
    })
    @Length(3, 20, {
        message: 'Title must be between 3 and 20 characters'
    })
    username: string;

    @Length(8, 20, {
        message: 'Password must be between 8 and 20 characters'
    })
    password: string;
}