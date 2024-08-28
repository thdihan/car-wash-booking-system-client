import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import { TService } from "../../types";
import { toast } from "sonner";
import { useUpdateServiceMutation } from "../../redux/features/service/service.api";

const DeleteServiceModal = ({ item }: { item: TService }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateService] = useUpdateServiceMutation();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleDelete = (item: TService) => {
        const toastId = toast.loading("Deleting Service", { duration: 2000 });
        try {
            updateService({
                id: item._id,
                payload: { ...item, isDeleted: true },
            }).unwrap();
            toast.success("Service deleted successfully.", {
                id: toastId,
                duration: 2000,
            });
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to delete service.", {
                id: toastId,
                duration: 2000,
            });
            setIsModalOpen(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="text-red-500">
                <DeleteOutlined
                    className="text-2xl"
                    title="Delete"
                    onClick={() => setIsModalOpen(true)}
                />
            </button>
            <Modal
                title="Are you sure you want to delete this service?"
                open={isModalOpen}
                onCancel={closeModal}
                okText="Delete"
                onOk={() => handleDelete(item)}
            >
                <p></p>
            </Modal>
        </>
    );
};

export default DeleteServiceModal;
