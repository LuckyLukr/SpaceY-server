import * as mongoose from 'mongoose';

export const SpacecraftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 40,
    },
    type: {
        type: String,
        required: true,
        min: 2,
        max: 40,
    },
    weight: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    seats: {
        type: Number, 
        required: true
    },
    tankCapacity: {
        type: Number, 
        required: true
    },
    tankCondition: {
        type: Number, 
        required: true
    },
    motorImpulse: {
        type: Number,
        required: true
    },
    fuelConsumption: {
        type: Number,
        required: true
    },
    startCombustion: {
        type: Number,
        required: true
    },
    landingCombustion: {
        type: Number,
        required: true
    },
    fridge: {
        type: Number,
        required: true
    }
});

export interface Spacecraft extends mongoose.Document {
    id: string;
    name: string;
    type: string;
    weight: number;
    status: string;
    seats: number;
    tankCapacity: number;
    tankCondition: number;
    motorImpulse: number;
    fuelConsumption: number,
    startCombustion: number,
    landingCombustion: number,
    fridge: number;
}