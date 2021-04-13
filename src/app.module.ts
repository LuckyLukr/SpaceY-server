import { Module } from '@nestjs/common';
import { MongooseModule } from'@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb+srv://Lukr:Langeer425401477@taskappcluster.96ojv.mongodb.net/ORBIT_DB?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
