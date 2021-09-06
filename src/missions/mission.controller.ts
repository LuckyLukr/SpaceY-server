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
import { Spacecraft } from "src/spacecrafts/spacecraft.model";
import { User } from "src/users/user.model";

import { MissionService } from "./mission.service"; 

@Controller('missions') 
    export class MissionController {
        constructor (private readonly missionService: MissionService) {}

        @Post()
        async addMission(
            @Body('name') prodName: string,
            @Body('spacecraft') prodSpacecraft: Spacecraft,
            @Body('astronauts') prodAstronauts: User[],
            @Body('status') prodStatus: string,
            @Body('blastOff') prodBlastOff: Date,
            @Body('landing') prodLanding: number,
            @Body('destination') prodDestination: string,
            @Body('distance') prodDistance: number,
            @Body('time') prodTime: string,
        ) {
            const generatedId = await this.missionService.insertMission(
                prodName,
                prodSpacecraft,
                prodAstronauts,
                prodStatus,
                prodBlastOff,
                prodLanding,
                prodDestination,
                prodDistance,
                prodTime
            );
            
            return { id: generatedId };
        }

        @Get()
        async getAllMissions() {
            const spacecrafts = await this.missionService.getMissions();
            return spacecrafts.map( e => ({
                id: e.id,
                name: e.name,
                spacecraft: e.spacecraft,
                astronauts: e.astronauts,
                status: e.status,
                blastOff: e.blastOff,
                landing: e.landing,
                destination: e.destination,
                distance: e.distance,
                time: e.time
            }));
        }

        @Get(':id')
        async getMission(@Param('id') prodId: string) {
            const mission = await this.missionService.getMission(prodId)
            return {
                id: mission.id,
                name: mission.name,
                spacecraft: mission.spacecraft,
                astronauts: mission.astronauts,
                status: mission.status,
                blastOff: mission.blastOff,
                landing: mission.landing,
                destination: mission.destination,
                distance: mission.distance,
                time: mission.time
            }
        }

        @Patch(':id')
        async updateSpacecraft(
            @Param('id') prodId: string,
            @Body('name') prodName: string,
            @Body('status') prodStatus: string
        ) {
            await this.missionService.updateMission(
                prodId,
                prodName,
                prodStatus
            );
            return null;
        }

        @Delete(':id')
        async removeMission(@Param('id') prodId: string) {
            await this.missionService.deleteMission(prodId);
            return null;
        }
    }