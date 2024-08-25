import { Button, Form } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import { PHInput, PHPasswordInput } from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const { register, handleSubmit } = useForm({
    //     defaultValues: {
    //         id: "0001",
    //         password: "admin12345",
    //     },
    // });

    const [login, { error }] = useLoginMutation();

    console.log("Error => ", error);

    const onSubmit = async (data: FieldValues) => {
        console.log("DATA: ", data);
        const toastId = toast.loading("Logging in...", { duration: 2000 });
        try {
            const userInfo = {
                id: data.id,
                password: data.password,
            };
            const res = await login(userInfo).unwrap();
            const user = verifyToken(res.data.accessToken) as TUser;
            dispatch(setUser({ user, token: res.data.accessToken }));
            toast.success("Login successful", { id: toastId, duration: 2000 });
            if (user.role === "superAdmin") navigate("/admin");
            else navigate(`/${user.role}`);
        } catch (error) {
            toast.error("Invalid ID or password", {
                id: toastId,
                duration: 2000,
            });
        }
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <PHForm onSubmit={onSubmit}>
                <PHInput name={"id"} placeholder={"User ID"} />
                <PHPasswordInput name="password" placeholder="Password" />

                <Button
                    htmlType="submit"
                    size="large"
                    style={{ marginTop: "1rem" }}
                >
                    Login
                </Button>
            </PHForm>
        </div>
    );
};

export default Login;
