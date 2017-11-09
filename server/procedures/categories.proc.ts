import * as db from '../config/db';
import {models} from '../Models/models.d';

export function getCategories(): Promise<Array<models.ICategory>> {
    return db.rows('GetCategories', []);
}

export function createCategory(name: string): Promise<models.ICategory> {
    return db.row('CreateCategory', [name]);
}