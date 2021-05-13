import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 40,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 40,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    role: {
        type: String,
        required: true
    },
    age: {
        type: Number, 
        required: true,
        min: 18, 
        max: 65
    },
    birth: {
        type: String, 
        required: true
    },
    consum: {
        type: Number, 
        required: true
    },
    weight: {
        type: Number, 
        required: true
    },
    onMission: {
        type: Boolean,
        required: true
    }
});

export interface User extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    age: number;
    birth: string;
    consum: number;
    weight: number;
    onMission: boolean;
}