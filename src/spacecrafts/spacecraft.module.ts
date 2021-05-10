import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { SpacecraftController } from "./spacecrafts.controller";
import { SpacecraftService } from "./spacecrafts.service";
import { SpacecraftSchema } from "./spacecraft.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Spacecraft', schema: SpacecraftSchema}])],
    controllers: [SpacecraftController],
    providers: [SpacecraftService],
    exports: [SpacecraftService]
})
export class SpacecraftModule {}