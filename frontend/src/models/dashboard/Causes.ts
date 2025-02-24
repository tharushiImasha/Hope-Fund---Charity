export class Causes {
    causeId: string;
    title: string;
    description: string;
    documentation: string;
    date: string;
    category: Category;
    location: string;
    image: string;
    goalAmount: number;
    raisedAmount: number;
    verifiedStatus: Status;
    crId: string;
    adminId: string;

    constructor(causeId: string, title: string, description: string, documentation: string, date: string, category: Category, location: string, image: string, goalAmount: number, raisedAmount: number, verifiedStatus: Status, crId: string, adminId: string) {
        this.causeId = causeId;
        this.title = title;
        this.description = description;
        this.documentation = documentation;
        this.date = date;
        this.category = category;
        this.location = location;
        this.image = image;
        this.goalAmount = goalAmount;
        this.raisedAmount = raisedAmount;
        this.verifiedStatus = verifiedStatus;
        this.crId = crId;
        this.adminId = adminId;
    }
}

export type Status = "Verified" | "Blocked" | "Pending";
export type Category = "Health" | "Education" | "Animal" | "Cancer";