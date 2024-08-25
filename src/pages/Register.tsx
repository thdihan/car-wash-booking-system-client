import { Button } from "antd";
import PHForm from "../components/form/PHForm";
import { PHInput, PHPasswordInput } from "../components/form/PHInput";
import { Link, useNavigate } from "react-router-dom";
import {
    ContactsOutlined,
    EnvironmentOutlined,
    MailOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";

const Register = () => {
    const [register, { isLoading }] = useRegisterMutation();

    const navigate = useNavigate();
    const handleRegister: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Registering...", { duration: 2000 });
        try {
            const userInfo = { ...data, role: "user" };
            console.log("USER INFO: ", userInfo);
            const res = await register(userInfo);
            console.log(res);

            if (res.error) {
                toast.error("Registration failed", {
                    id: toastId,
                    duration: 2000,
                });
                return;
            }

            toast.success("Registration successful", {
                id: toastId,
                duration: 2000,
            });

            navigate("/login");
        } catch (error) {
            toast.error("Registration failed", { duration: 2000 });
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-full bg-blue-100">
            <div className="h-full my-8">
                <PHForm
                    onSubmit={handleRegister}
                    formTitle="Register"
                    resolver={zodResolver(userSchema)}
                >
                    <PHInput name="name" label="Name" icon={<UserOutlined />} />
                    <PHInput
                        name="email"
                        label="Email"
                        icon={<MailOutlined />}
                    />
                    <PHPasswordInput name="password" placeholder="Password" />
                    <PHInput
                        name="phone"
                        label="Contact"
                        icon={<ContactsOutlined />}
                    />
                    <PHInput
                        name="address"
                        label="Address"
                        icon={<EnvironmentOutlined />}
                    />
                    <div className="flex flex-col space-y-4">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            disabled={isLoading}
                        >
                            Register
                        </Button>
                        <h4 className="font-medium">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-[#1677FF]"
                            >
                                Login
                            </Link>
                        </h4>
                    </div>
                </PHForm>
            </div>
        </div>
    );
};

export default Register;
