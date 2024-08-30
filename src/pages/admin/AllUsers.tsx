import UserTable from "../../components/ui/UserTable";
import { useGetAllUsersQuery } from "../../redux/features/user/userManagement.api";

const AllUsers = () => {
    const { data: userData, isFetching } = useGetAllUsersQuery(undefined);
    console.log("USER DATA", userData);
    return (
        <div>
            <UserTable userData={userData?.data} isFetching={isFetching} />
        </div>
    );
};

export default AllUsers;
