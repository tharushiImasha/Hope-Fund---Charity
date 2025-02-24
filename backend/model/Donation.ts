import { ObjectId } from "mongodb";

export default class Donation {
    id!: ObjectId;
    donationId!: string;
    donorId?: string;
    causeId?: string;
    amount!: number;
    date!: string;
    paymentMethod!: string;
    message?: string;
}
