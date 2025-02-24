import { ObjectId } from "mongodb";

export default class CharityProgramme {
    id?: ObjectId;
    causeId!: string;
    title!: string;
    description!: string;
    documentation!: string;
    date!: Date;
    category!: string;
    location!: string;
    image!: string;
    goalAmount!: number;
    raisedAmount!: number;
    verifiedStatus!: boolean;
    crId?: string;
    adminId?: string;
}
