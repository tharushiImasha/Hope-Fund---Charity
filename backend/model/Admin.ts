import { ObjectId } from "mongodb";

export default class Admin {
    id!: ObjectId;
    adminId!: string;
    name!: string;
    phone!: string;
    userId?: string;
}
