export class Donor {
    donorId: string;
    email: string;
    name: string;
    phone: string;
    userId: string;

    constructor(donorId: string, email: string, name: string, phone: string, userId: string) {
        this.donorId = donorId;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.userId = userId;
    }
}
