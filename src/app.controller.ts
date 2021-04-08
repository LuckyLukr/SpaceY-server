import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): {greet: string, name: string} {
    return { greet: 'Hey', name: 'Luke'};
  }
}
