import { ObjectId } from "mongodb";

export default class CharityRepresentative {
    id!: ObjectId;
    crId!: string;
    name!: string;
    address!: string;
    userId?: string;
}
