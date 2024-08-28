import AddServiceModal from "../../../components/ui/serviceComponents/AddServiceModal";
import ServiceTable from "../../../components/ui/serviceComponents/ServiceTable";
import AddSlotModal from "../../../components/ui/slotComponents/AddSlotModal";
import { useGetServicesQuery } from "../../../redux/features/admin/service.api";

const item = {
    _id: "",
    name: "",
    description: "",
    isDeleted: false,
};
const Slots = () => {
    const { data: serviceData, isFetching } = useGetServicesQuery(undefined);

    return (
        <div className="space-y-4">
            {/* Service Header  */}
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Available Services</h1>
                <AddSlotModal />
            </div>

            {/* Services Table */}
            <div>
                <ServiceTable
                    serviceData={serviceData?.data}
                    isFetching={isFetching}
                />
            </div>
        </div>
    );
};

export default Slots;
