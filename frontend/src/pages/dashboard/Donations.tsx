import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch} from "../../store/Store.ts";
import {getDonation} from "../../reducers/DonationSlice.ts";

export function Donations() {
    const donation = useSelector((state) => state.donation );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(donation.length === 0){
            dispatch(getDonation());
        }
    }, [dispatch, donation.length]);

    return (
        <>
            <div className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Admin</h2>
                <section className="crops-table-sec">
                    <div className="crop-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-400">
                            <thead>
                            <tr>
                                <th className="custom-table-th">Donation ID</th>
                                <th className="custom-table-th">Donor ID</th>
                                <th className="custom-table-th">Cause ID</th>
                                <th className="custom-table-th">Amount</th>
                                <th className="custom-table-th">Date</th>
                                <th className="custom-table-th">Payment Method</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {donation.map(donations => (
                                <tr
                                    key={donations.donationId}
                                >
                                    <td className="custom-table-td">{donations.donationId}</td>
                                    <td className="custom-table-td">{donations.donorId}</td>
                                    <td className="custom-table-td">{donations.causeId}</td>
                                    <td className="custom-table-td">{donations.amount}</td>
                                    <td className="custom-table-td">{donations.date}</td>
                                    <td className="custom-table-td">{donations.paymentMethod}</td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </>
    );
}