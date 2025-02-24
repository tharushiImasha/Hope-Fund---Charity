export class Charity {
    email: string;
    name: string;
    address: string;
    nic: string;

    constructor(email: string, name: string, address: string, nic: string) {
        this.email = email;
        this.name = name;
        this.address = address;
        this.nic = nic;
    }
}