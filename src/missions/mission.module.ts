import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { MissionController } from "./mission.controller"; 
import { MissionService } from "./mission.service"; 
import { MissionSchema } from "./mission.model"; 

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Mission', schema: MissionSchema}])],
    controllers: [MissionController],
    providers: [MissionService],
    exports: [MissionService]
})
export class MissionModule {}