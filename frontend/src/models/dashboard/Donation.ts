export class Donation {
    donationId: String;
    donorId: String;
    causeId: String;
    amount: number;
    date: String;
    paymentMethod: String;
    message: String;

    constructor(donationId: String, donorId: String, causeId: String, amount: number, date: String, paymentMethod: String, message: String) {
        this.donationId = donationId;
        this.donorId = donorId;
        this.causeId = causeId;
        this.amount = amount;
        this.date = date;
        this.paymentMethod = paymentMethod;
        this.message = message;
    }
}