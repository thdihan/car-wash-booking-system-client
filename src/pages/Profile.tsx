import { Button } from "antd";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useGerPersonalDataQuery } from "../redux/features/user/userManagement.api";
import { useAppSelector } from "../redux/hooks";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);
    const { data: personalData } = useGerPersonalDataQuery(user?.id ?? "");
    console.log(personalData);

    const handleUpdateProfile = () => {
        navigate("/admin/update-profile");
    };
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-xl font-medium">Personal Profile</h2>
                <Button
                    size="large"
                    type="primary"
                    onClick={handleUpdateProfile}
                >
                    Update Profile
                </Button>
            </div>

            <div>
                <table className="w-full bg-white my-2">
                    <tr>
                        <td className="p-4 border-2">Name</td>
                        <td className="p-4 border-2">
                            {personalData?.data.name}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-4 border-2">Email</td>
                        <td className="p-4 border-2">
                            {personalData?.data.email}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-4 border-2">Phone</td>
                        <td className="p-4 border-2">
                            {personalData?.data.phone}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-4 border-2">Address</td>
                        <td className="p-4 border-2">
                            {personalData?.data.address}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-4 border-2">Role</td>
                        <td className="p-4 border-2">
                            {_.upperCase(personalData?.data.role)}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Profile;
