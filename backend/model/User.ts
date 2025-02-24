import { ObjectId } from "mongodb";

export default class User {
    id!: ObjectId;
    email!: string;
    password!: string;
    role!: string;
    userId?: string;
}
