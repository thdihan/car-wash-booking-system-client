import AddSlotModal from "../../../components/ui/slotComponents/AddSlotModal";
import SlotTable from "../../../components/ui/slotComponents/SlotTable";

import { useGetSlotsQuery } from "../../../redux/features/admin/slot.api";

const Slots = () => {
    const { data: slotData } = useGetSlotsQuery(undefined);

    return (
        <div className="space-y-4">
            {/* Service Header  */}
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Available Services</h1>
                <AddSlotModal />
            </div>

            {/* Services Table */}
            <div>
                <SlotTable slotData={slotData?.data} isFetching={false} />
            </div>
        </div>
    );
};

export default Slots;
