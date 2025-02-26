export class Admins {
    id: string;
    email: string;
    name: string;
    phone: string;
    address: string;
    userId: string;

    constructor(adminId: string, email: string, name: string, phone: string, address: string, userId: string) {
        this.id = adminId;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.userId = userId;
    }
}