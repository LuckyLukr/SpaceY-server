import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Spacecraft } from './spacecraft.model';

@Injectable()
export class SpacecraftService {
    private spacecrafts: Spacecraft[] = [];

    constructor(@InjectModel('Spacecraft') private readonly spacecraftModel: Model<Spacecraft>) {}

    async insertSpacecraft( 
        name: string,
        type: string,
        weight: number,
        status: string,
        seats: number,
        tankCapacity: number,
        tankCondition: number,
        motorImpulse: number,
        fuelConsumption: number,
        startCombustion: number,
        landingCombustion: number,
        fridge: number,
    ) {
        //Checking if the spacecraft is already in the DB
        const nameExists = await this.spacecraftModel.findOne({name});
        if(nameExists) throw new UnauthorizedException('Name already exists');

        const newSpacecraft = new this.spacecraftModel({
            name, 
            type, 
            weight, 
            status, 
            seats, 
            tankCapacity, 
            tankCondition, 
            motorImpulse, 
            fuelConsumption,
            startCombustion,
            landingCombustion,
            fridge
        })
        const result = await newSpacecraft.save();
        
        return result.id as string;
    }

    async getSpacecrafts() {
        const spacecrafts = await this.spacecraftModel.find().exec();
        return spacecrafts as Spacecraft[];
    }

    async getSpacecraft(spacecraftId: string,) {
        const spacecraft = await this.findSpacecraft(spacecraftId);
        return spacecraft;
    }

    async deleteSpacecraft(prodId: string) {
        const result = await this.spacecraftModel.deleteOne({_id: prodId}).exec();
        if( result.n === 0 ) { throw new NotFoundException('Error: Deletion did not succeeded.') }
    }

    async updateSpacecraft(
        spacecraftId: string,
        name: string,
        status: string,
        tankCondition: number,
    ) {
        const updatedSpacecraft = await this.findSpacecraft(spacecraftId);
        if (name) {
            updatedSpacecraft.name = name;
        }
        if (status) {
            updatedSpacecraft.status = status;
        }
        if (tankCondition) {
            updatedSpacecraft.tankCondition = tankCondition;
        }
        updatedSpacecraft.save();
    }

    private async findSpacecraft( id: string): Promise<Spacecraft> {
        let spacecraft;
        try{
            spacecraft = await this.spacecraftModel.findById(id);
        } catch(error) {
            throw new NotFoundException('spacecraft not found...');
        }
        if(!spacecraft) {throw new NotFoundException('spacecraft not found...')};
        return spacecraft;
    }

}