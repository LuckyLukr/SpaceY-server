import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Mission } from './mission.model';
import { Spacecraft } from "src/spacecrafts/spacecraft.model";
import { User } from "src/users/user.model";

@Injectable()
export class MissionService {
    private missions: Mission[] = [];

    constructor(@InjectModel('Mission') private readonly missionModel: Model<Mission>) {}

    async insertMission(
        name: string,
        spacecraft: Spacecraft,
        astronauts: User[],
        status: string,
        blastOff: string,
        landing: string,
        destination: string,
        distance: number,
        time: string
    ) {
        //Checking if the mission is already in the DB
        const nameExists = await this.missionModel.findOne({name});
        if(nameExists) throw new UnauthorizedException('Name already exists');

        const newMission = new this.missionModel({
            name, 
            spacecraft, 
            astronauts, 
            status, 
            blastOff, 
            landing, 
            destination, 
            distance, 
            time
        })
        const result = await newMission.save();
        
        return result.id as string;
    }

    async getMissions() {
        const missions = await this.missionModel.find().exec();
        return missions as Mission[];
    }

    async getMission(missionId: string,) {
        const mission = await this.findMission(missionId);
        return mission;
    }

    async deleteMission(prodId: string) {
        const result = await this.missionModel.deleteOne({_id: prodId}).exec();
        if( result.n === 0 ) { throw new NotFoundException('Error: Deletion did not succeeded.') }
    }

    async updateMission(
        missionId: string,
        name: string,
        status: string
    ) {
        const updatedMission = await this.findMission(missionId);
        if (name) {
            updatedMission.name = name;
        }
        if (status) {
            updatedMission.status = status;
        }
        updatedMission.save();
    }

    private async findMission( id: string): Promise<Mission> {
        let mission;
        try{
            mission = await this.missionModel.findById(id);
        } catch(error) {
            throw new NotFoundException('mission not found...');
        }
        if(!mission) {throw new NotFoundException('mission not found...')};
        return mission;
    }

}