import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

export const PHInput = ({
    name,
    placeholder,
    label = "Text",
}: {
    name: string;
    placeholder?: string;
    label?: string;
}) => {
    return (
        <div>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Input
                            size="large"
                            {...field}
                            placeholder={placeholder || label}
                            prefix={<UserOutlined />}
                            id={name}
                        />
                        {error && (
                            <p style={{ color: "red" }}>{error.message}</p>
                        )}
                    </Form.Item>
                )}
            />
        </div>
    );
};

export const PHPasswordInput = ({
    name,
    placeholder,
    label = "Password",
}: {
    name: string;
    placeholder: string;
    label?: string;
}) => {
    return (
        <div>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item label={label}>
                        <Input.Password
                            size="large"
                            {...field}
                            placeholder={placeholder}
                            prefix={<LockOutlined />}
                            id={name}
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};
