import { Button } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import { PHInput, PHPasswordInput } from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [login, { error }] = useLoginMutation();

    console.log("Error => ", error);

    const onSubmit = async (data: FieldValues) => {
        console.log("DATA: ", data);
        const toastId = toast.loading("Logging in...", { duration: 2000 });
        // try {
        //     const userInfo = {
        //         id: data.id,
        //         password: data.password,
        //     };
        //     const res = await login(userInfo).unwrap();
        //     const user = verifyToken(res.data.accessToken) as TUser;
        //     dispatch(setUser({ user, token: res.data.accessToken }));
        //     toast.success("Login successful", { id: toastId, duration: 2000 });
        //     if (user.role === "superAdmin") navigate("/admin");
        //     else navigate(`/${user.role}`);
        // } catch (error) {
        //     toast.error("Invalid ID or password", {
        //         id: toastId,
        //         duration: 2000,
        //     });
        // }
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#e6f4ff",
            }}
        >
            <PHForm onSubmit={onSubmit} formTitle="Login">
                <PHInput name="email" label="Email" />
                <PHPasswordInput name="password" placeholder="Password" />

                <div className="flex flex-col space-y-4">
                    <Button htmlType="submit" type="primary" size="large">
                        Login
                    </Button>
                    <h4 className="font-medium">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-[#1677FF]"
                        >
                            Sign Up
                        </Link>
                    </h4>
                </div>
            </PHForm>
        </div>
    );
};

export default Login;
