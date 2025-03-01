import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CauseCard } from "./CauseCard.tsx";
import {AppDispatch} from "../../store/Store.ts";
import {RootState} from "@reduxjs/toolkit/query";
import {getCause} from "../../reducers/CauseSlice.ts";

export function Causes() {
    const dispatch = useDispatch<AppDispatch>();
    const causes = useSelector((state: RootState) => state.cause);

    const approvedCauses = causes.filter((cause) => cause.verifiedStatus === "Verified");

    useEffect(() => {
        dispatch(getCause());
    }, [dispatch]);

    return (
        <div className="container mx-auto p-28 pt-35">
            <div className="text-center">
                <h3 className="text-black/40 text-[18px]">Donation Shows Passion</h3>
                <h2 className="text-[36px] font-semibold mb-10">Featured Causes</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {approvedCauses.length > 0 ? (
                    approvedCauses.map((cause) => <CauseCard key={cause.causeId} cause={cause} />)
                ) : (
                    <p className="text-center col-span-3 text-gray-500">No approved causes available</p>
                )}
            </div>
        </div>
    );
}
