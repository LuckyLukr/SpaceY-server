import {
    Body,
    Controller,
    Post,
    Get
} from "@nestjs/common";

import { UsersService } from './users.service';

@Controller('users')
    export class UsersController {
        constructor(private readonly usersService: UsersService) {}

        @Post()
        addUser(
            @Body('firstName') prodFName: string,
            @Body('lastName') prodLName: string,
            @Body('email') prodEmail: string,
            @Body('password') prodPassword: string,
            @Body('role') prodRole: string,
            @Body('age') prodAge: number,
            @Body('consum') prodConsum: number,
            @Body('weight') prodWeight: number,
        ) {
            const generatedId = this.usersService.insertUser(
                prodFName,
                prodLName,
                prodEmail,
                prodPassword,
                prodRole,
                prodAge,
                prodConsum,
                prodWeight,
            );
            
            return { id: generatedId };
        }

        @Get()
        getAllUsers() {
            return this.usersService.getUsers();
        }
    }