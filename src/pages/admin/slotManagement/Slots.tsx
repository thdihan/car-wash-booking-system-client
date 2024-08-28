import AddServiceModal from "../../../components/ui/serviceComponents/AddServiceModal";
import ServiceTable from "../../../components/ui/serviceComponents/ServiceTable";
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
                <AddServiceModal updateMode={false} item={item} />
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
