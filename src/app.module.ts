import { Module } from '@nestjs/common';
import { MongooseModule } from'@nestjs/mongoose';
require('dotenv').config();

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { SpacecraftModule } from './spacecrafts/spacecraft.module';
import { MissionModule } from './missions/mission.module';

@Module({
  imports: [
    UsersModule,
    SpacecraftModule,
    MissionModule,
    MongooseModule.forRoot(process.env.ATLAS_URI),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AuthService],
})
export class AppModule {}
