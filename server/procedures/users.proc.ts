import * as db from '../config/db';
import {models} from '../Models/models.d';

export function getUsers(): Promise<Array<models.IUser>> {
    return db.rows('GetUsers', []);
}

export function getUser(id: number): Promise<models.IUser> {
    return db.row('GetUser', [id]);
}

export function updateUser(id: number, firstName: string, lastName: string, email: string) {
    return db.empty('UpdateUser', [id, firstName, lastName, email]);
}

export function deleteUser(id: number) {
    return db.empty('DeleteUser', [id]);
}

export function getUserByEmail(email: string): Promise<models.IUser> {
    return db.row('GetUserByEmail', [email]);
}

export function createUser(firstName: string, lastName: string, email: string, password: string) {
    return db.row('CreateUser', [firstName, lastName, email, password]);
}