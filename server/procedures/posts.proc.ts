import * as db from '../config/db';
import {models} from '../Models/models.d';

export function getPosts(): Promise<Array<models.IPost>> {
    return db.rows('GetPosts', []);
}

export function createPost(userId: number, categoryId: number, title: string, content: string): Promise<models.IPost> {
    return db.row('CreatePost', [userId, categoryId, title, content]);
}

export function getPost(id: number): Promise<models.IPost> {
    return db.row('GetPost', [id]);
}

export function updatePost(id: number, categoryId: number, title: string, content: string) {
    return db.empty('UpdatePost', [id, categoryId, title, content]);
}

export function deletePost(id: number) {
    return db.empty('DeletePost', [id]);
}