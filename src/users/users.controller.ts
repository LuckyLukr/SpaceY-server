import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

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
            @Body('birth') prodBirth: string,
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
                prodBirth,
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

        @UseGuards(JwtAuthGuard)
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
                birth: e.birth,
                consum: e.consum,
                weight: e.weight,
                onMission: e.onMission,
            }));
        }

        @UseGuards(JwtAuthGuard)
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
                birth: user.birth,
                consum: user.consum,
                weight: user.weight,
                onMission: user.onMission,

            }
        }

        @UseGuards(JwtAuthGuard)
        @Patch(':id')
        async updateUser(
            @Param('id') prodId: string,
            @Body('firstName') prodFName: string,
            @Body('lastName') prodLName: string,
            @Body('age') prodAge: number,
            @Body('birth') prodBirth: string,
            @Body('consum') prodConsum: number,
            @Body('weight') prodWeight: number,
            @Body('onMission') prodOnMission: boolean,
        ) {
            await this.usersService.updateUser(
                prodId,
                prodFName,
                prodLName,
                prodAge,
                prodBirth,
                prodConsum,
                prodWeight,
                prodOnMission
            );
            return null;
        }

        @UseGuards(JwtAuthGuard)
        @Delete(':id')
        async removeUser(@Param('id') prodId: string) {
            await this.usersService.deleteUser(prodId);
            return null;
        }
    }