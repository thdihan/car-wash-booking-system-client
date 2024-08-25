import { Button } from "antd";
import PHForm from "../components/form/PHForm";
import { PHInput, PHPasswordInput } from "../components/form/PHInput";
import { Link } from "react-router-dom";
import {
    ContactsOutlined,
    EnvironmentOutlined,
    MailOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { FieldValues } from "react-hook-form";

const Register = () => {
    const handleRegister = (data: FieldValues) => {
        console.log("Register Data: ", data);
    };
    return (
        <div className="flex flex-col items-center justify-center h-full bg-blue-100">
            <div className="h-full my-8">
                <PHForm onSubmit={handleRegister} formTitle="Register">
                    <PHInput name="name" label="Name" icon={<UserOutlined />} />
                    <PHInput
                        name="email"
                        label="Email"
                        icon={<MailOutlined />}
                    />
                    <PHPasswordInput name="password" placeholder="Password" />
                    <PHPasswordInput
                        name="confirm-password"
                        label="Confirm Password"
                    />
                    <PHInput
                        name="contact"
                        label="Contact"
                        icon={<ContactsOutlined />}
                    />
                    <PHInput
                        name="address"
                        label="Address"
                        icon={<EnvironmentOutlined />}
                    />
                    <div className="flex flex-col space-y-4">
                        <Button htmlType="submit" type="primary" size="large">
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
