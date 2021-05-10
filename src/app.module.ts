import { Module } from '@nestjs/common';
import { MongooseModule } from'@nestjs/mongoose';
require('dotenv').config();

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { SpacecraftModule } from './spacecrafts/spacecraft.module';

@Module({
  imports: [
    UsersModule,
    SpacecraftModule,
    MongooseModule.forRoot(process.env.ATLAS_URI),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
