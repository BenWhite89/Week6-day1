export declare namespace models {
    export interface IUser {
        id: number;
        email: string;
        password: string;
    }
    export interface ICategory {
        id: number;
        name: string;
    }
    export interface IPost {
        id: number;
        title: string;
        userId: number;
        categoryId: number;
        content: string;
        createdAt: number;
        authorFirstName: string;
        authorLastName: string;
    }
}

