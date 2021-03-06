import * as mongoose from 'mongoose';
import { Spacecraft } from 'src/spacecrafts/spacecraft.model';
import { User } from 'src/users/user.model';

export const MissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    spacecraft: {
        type: Object,
        required: true
    },
    astronauts: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    blastOff: {
        type: Date,
        required: true
    },
    landing: {
        type: Number
    },
    destination: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

export interface Mission extends mongoose.Document {
    id: string,
    name: string,
    spacecraft: Spacecraft,
    astronauts: User[],
    status: string,
    blastOff: Date,
    landing: number,
    destination: string,
    distance: number,
    time: string
  }