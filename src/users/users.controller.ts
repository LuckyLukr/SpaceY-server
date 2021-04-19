import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Patch,
    Delete
} from "@nestjs/common";

import { UsersService } from './users.service';

@Controller('users')
    export class UsersController {
        constructor(private readonly usersService: UsersService) {}

        @Post()
        async addUser(
            @Body('firstName') prodFName: string,
            @Body('lastName') prodLName: string,
            @Body('email') prodEmail: string,
            @Body('password') prodPassword: string,
            @Body('repeatPassword') prodRepeatPassword: string,
            @Body('role') prodRole: string,
            @Body('age') prodAge: number,
            @Body('consum') prodConsum: number,
            @Body('weight') prodWeight: number,
            @Body('onMission') prodOnMission: boolean,
        ) {
            const generatedId = await this.usersService.insertUser(
                prodFName,
                prodLName,
                prodEmail,
                prodPassword,
                prodRepeatPassword,
                prodRole,
                prodAge,
                prodConsum,
                prodWeight,
                prodOnMission
            );
            
            return { id: generatedId };
        }

        @Post('login')
        async loginUser(@Body('email') prodEmail: string, @Body('password') prodPassword: string,) {
            const user = await this.usersService.loginUser(prodEmail,prodPassword);
            return user;
        }

        @Get()
        async getAllUsers() {
            const users = await this.usersService.getUsers();
            return users.map( e => ({
                id: e.id,
                firstName: e.firstName,
                lastName: e.lastName,
                email: e.email,
                role: e.role,
                age: e.age,
                consum: e.consum,
                weight: e.weight,
                onMission: e.onMission,
            }));
        }

        @Get(':id')
        async getUser(@Param('id') prodId: string) {
            const user = await this.usersService.getUser(prodId)
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                age: user.age,
                consum: user.consum,
                weight: user.weight,
                onMission: user.onMission,

            }
        }

        @Patch(':id')
        async updateUser(
            @Param('id') prodId: string,
            @Body('firstName') prodFName: string,
            @Body('lastName') prodLName: string,
            @Body('age') prodAge: number,
            @Body('consum') prodConsum: number,
            @Body('weight') prodWeight: number,
            @Body('onMission') prodOnMission: boolean,
        ) {
            await this.usersService.updateUser(
                prodId,
                prodFName,
                prodLName,
                prodAge,
                prodConsum,
                prodWeight,
                prodOnMission
            );
            return null;
        }

        @Delete(':id')
        async removeUser(@Param('id') prodId: string) {
            await this.usersService.deleteUser(prodId);
            return null;
        }
    }