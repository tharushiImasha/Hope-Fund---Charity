export class Charity {
    crId: string;
    email: string;
    name: string;
    address: string;
    nic: string;
    userId: string;

    constructor(crId: string, email: string, name: string, address: string, nic: string, userId: string) {
        this.crId = crId;
        this.email = email;
        this.name = name;
        this.address = address;
        this.nic = nic;
        this.userId = userId;
    }
}