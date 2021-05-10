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
            @Body('onMission') prodOnMission: boolean,
            @Body('destroyed') prodDestroyed: boolean,
            @Body('seats') prodSeats: number,
            @Body('tankCapacity') prodTankCapacity: number,
            @Body('tankCondition') prodTankCondition: number,
            @Body('motorImpulse') prodMotorImpulse: number,
            @Body('fridge') prodFridge: number,
        ) {
            const generatedId = await this.spacecraftService.insertSpacecraft(
                prodName,
                prodType,
                prodWeight,
                prodOnMission,
                prodDestroyed,
                prodSeats,
                prodTankCapacity,
                prodTankCondition,
                prodMotorImpulse,
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
                onMission: e.onMission,
                destroyed: e.destroyed,
                seats: e.seats,
                tankCapacity: e.tankCapacity,
                tankCondition: e.tankCondition,
                motorImpulse: e.motorImpulse,
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
                onMission: spacecraft.onMission,
                destroyed: spacecraft.destroyed,
                seats: spacecraft.seats,
                tankCapacity: spacecraft.tankCapacity,
                tankCondition: spacecraft.tankCondition,
                motorImpulse: spacecraft.motorImpulse,
                fridge: spacecraft.fridge,
            }
        }

        @Delete(':id')
        async removeSpacecraft(@Param('id') prodId: string) {
            await this.spacecraftService.deleteSpacecraft(prodId);
            return null;
        }
    }