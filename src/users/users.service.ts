import { Injectable } from "@nestjs/common";

import { User } from './user.model';

@Injectable()
export class UsersService {
    private users: User[] = [];

    insertUser( 
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: string,
        age: number,
        consum: number,
        weight: number
    ) {
        const prodId = new Date(Date.now()).toString();
        const newUser = new User(
                            prodId,
                            firstName,
                            lastName,
                            email,
                            password,
                            role,
                            age,
                            consum,
                            weight
                            )
        this.users.push(newUser);
        return prodId;
    }

    getUsers() {
        return [...this.users];
    }
}