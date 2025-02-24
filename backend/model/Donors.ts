import { ObjectId } from "mongodb";

export default class Donors {
    id!: ObjectId;
    donorId!: string;
    name!: string;
    phone!: string;
    userId?: string;
}
