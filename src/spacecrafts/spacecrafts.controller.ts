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

import { SpacecraftService } from './spacecrafts.service';

@Controller('spacecrafts') 
    export class SpacecraftController {
        constructor (private readonly spacecraftService: SpacecraftService) {}

        @Post()
        async insertSpacecraft(
            @Body('name') prodName: string,
            @Body('type') prodType: string,
            @Body('weight') prodWeight: number,
            @Body('status') prodStatus: string,
            @Body('seats') prodSeats: number,
            @Body('tankCapacity') prodTankCapacity: number,
            @Body('tankCondition') prodTankCondition: number,
            @Body('motorImpulse') prodMotorImpulse: number,
            @Body('fuelConsumption') prodFuelConsumption: number,
            @Body('startCombustion') prodStartCombustion: number,
            @Body('landingCombustion') prodLandingCombustion: number,
            @Body('fridge') prodFridge: number,
        ) {
            const generatedId = await this.spacecraftService.insertSpacecraft(
                prodName,
                prodType,
                prodWeight,
                prodStatus,
                prodSeats,
                prodTankCapacity,
                prodTankCondition,
                prodMotorImpulse,
                prodFuelConsumption,
                prodStartCombustion,
                prodLandingCombustion,
                prodFridge
            );
            
            return { id: generatedId };
        }

        @Get()
        async getAllSpacecrafts() {
            const spacecrafts = await this.spacecraftService.getSpacecrafts();
            return spacecrafts.map( e => ({
                id: e.id,
                name: e.name,
                type: e.type,
                weight: e.weight,
                status: e.status,
                seats: e.seats,
                tankCapacity: e.tankCapacity,
                tankCondition: e.tankCondition,
                motorImpulse: e.motorImpulse,
                fuelConsumption: e.fuelConsumption,
                startCombustion: e.startCombustion,
                landingCombustion: e.landingCombustion,
                fridge: e.fridge
            }));
        }

        @Get(':id')
        async getSpacecraft(@Param('id') prodId: string) {
            const spacecraft = await this.spacecraftService.getSpacecraft(prodId)
            return {
                id: spacecraft.id,
                name: spacecraft.name,
                type: spacecraft.type,
                weight: spacecraft.weight,
                status: spacecraft.status,
                seats: spacecraft.seats,
                tankCapacity: spacecraft.tankCapacity,
                tankCondition: spacecraft.tankCondition,
                motorImpulse: spacecraft.motorImpulse,
                fuelConsumption: spacecraft.fuelConsumption,
                startCombustion: spacecraft.startCombustion,
                landingCombustion: spacecraft.landingCombustion,
                fridge: spacecraft.fridge,
            }
        }

        @Patch(':id')
        async updateSpacecraft(
            @Param('id') prodId: string,
            @Body('name') prodName: string,
            @Body('status') prodStatus: string,
            @Body('tankCondition') prodTankCondition: number
        ) {
            await this.spacecraftService.updateSpacecraft(
                prodId,
                prodName,
                prodStatus,
                prodTankCondition,
            );
            return null;
        }

        @Delete(':id')
        async removeSpacecraft(@Param('id') prodId: string) {
            await this.spacecraftService.deleteSpacecraft(prodId);
            return null;
        }
    }