import { Button, Col } from "antd";
import PHForm from "../components/form/PHForm";
import { PHInputUpdate } from "../components/form/PHInput";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import {
    useGerPersonalDataQuery,
    useUpdateProfileMutation,
} from "../redux/features/user/userManagement.api";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const { data: personalData, isFetching } = useGerPersonalDataQuery(
        user?.id ?? ""
    );

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const defaultValues = {
        name: personalData?.data.name,
        email: personalData?.data.email,
        phone: personalData?.data.phone,
        address: personalData?.data.address,
    };
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const toastId = toast.loading("Updating profile...", {
            duration: 2000,
        });

        try {
            const newUserData = { id: personalData?.data._id, payload: data };
            const res = await updateProfile(newUserData).unwrap();

            console.log(res);
            toast.success("Profile updated successfully", {
                id: toastId,
                duration: 2000,
            });
            navigate("/admin/profile");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile", {
                id: toastId,
                duration: 2000,
            });
        }
    };
    return (
        <div className="p-8 bg-white">
            <h2 className="text-xl mb-8">Update Profile</h2>
            {isFetching ? (
                <LoadingSpinner />
            ) : (
                <PHForm
                    onSubmit={handleSubmit}
                    defaultValues={defaultValues}
                    initialValues={defaultValues}
                >
                    <Col span={24}>
                        <PHInputUpdate name="name" label="Name" />
                    </Col>
                    <Col span={24}>
                        <PHInputUpdate name="email" label="Email" />
                    </Col>
                    <Col span={24}>
                        <PHInputUpdate name="phone" label="Phone" />
                    </Col>
                    <Col span={24}>
                        <PHInputUpdate name="address" label="Address" />
                    </Col>
                    <div className="text-end">
                        <Button
                            htmlType="submit"
                            size="large"
                            type="primary"
                            loading={isLoading}
                        >
                            Update Profile
                        </Button>
                    </div>
                </PHForm>
            )}
        </div>
    );
};

export default UpdateProfile;
