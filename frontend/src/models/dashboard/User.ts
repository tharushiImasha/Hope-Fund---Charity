export class User {
    userId: string;
    email: string;
    password: string;
    role: Role;

    constructor(userId: string, email: string, password: string, role: Role) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

export type Role = "Charity Representative" | "Donor";
