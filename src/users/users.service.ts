import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
const { registerValidation } = require('../validation');
const sha1 = require('js-sha1');

import { User } from './user.model';

@Injectable()
export class UsersService {
    private users: User[] = [];

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async insertUser( 
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        repeatPassword: string,
        role: string,
        age: number,
        consum: number,
        weight: number,
        onMission: boolean
    ) {
        //Data validation
        const { error } = registerValidation({firstName, lastName, age, email, password, repeatPassword, role,});
        if(error) throw new NotFoundException(error.details[0].message);

        //Checking if the user is already in the DB
        const emailExists = await this.userModel.findOne({email});
        if(emailExists) {
            throw new NotFoundException('Email already exists');
        }

        const hashedPass = sha1(password);
        const newUser = new this.userModel({firstName, lastName, email, password:hashedPass, role, age, consum, weight, onMission,})
        const result = await newUser.save();
        
        return result.id as string;
    }

    async loginUser(email: string, pass: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({email: email});
        if(!user || user.password != pass) { throw new NotFoundException('Wrong email or password') }
        return user;
      }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users as User[];
    }

    async getUser(userId: string,) {
        const user = await this.findUser(userId);
        return user;
    }

    async updateUser(
        userId: string,
        firstName: string,
        lastName: string,
        age: number,
        consum: number,
        weight: number,
        onMission: boolean
    ) {
        const updatedUser = await this.findUser(userId);
        if (firstName) {
            updatedUser.firstName = firstName;
        }
        if (lastName) {
            updatedUser.lastName = lastName;
        }
        if (age) {
            updatedUser.age = age;
        }
        if (consum) {
            updatedUser.consum = consum;
        }
        if (weight) {
            updatedUser.weight = weight;
        }
        if (onMission) {
            updatedUser.onMission = onMission;
        }
        updatedUser.save();
    }

    async deleteUser(prodId: string) {
        const result = await this.userModel.deleteOne({_id: prodId}).exec();
        if( result.n === 0 ) { throw new NotFoundException('Error: Deletion did not succeeded.') }
    }

    private async findUser( id: string): Promise<User> {
        let user;
        try{
            user = await this.userModel.findById(id);
        } catch(error) {
            throw new NotFoundException('User not found...');
        }
        if(!user) {throw new NotFoundException('User not found...')};
        return user;
    }
}