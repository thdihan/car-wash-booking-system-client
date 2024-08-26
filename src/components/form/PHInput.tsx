import { LockOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber } from "antd";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

export const PHInput = ({
    name,
    placeholder,
    label = "Text",
    icon,
    type = "text",
}: {
    name: string;
    placeholder?: string;
    label?: string;
    icon?: ReactNode;
    type?: string;
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
                            prefix={icon}
                            id={name}
                            type={type}
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
    placeholder?: string;
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
                            placeholder={placeholder || label}
                            prefix={<LockOutlined />}
                            id={name}
                        />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export const PHInputNumber = ({
    name,
    placeholder,
    label = "Text",
    icon,
    type = "number",
}: {
    name: string;
    placeholder?: string;
    label?: string;
    icon?: ReactNode;
    type?: string;
}) => {
    return (
        <div>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <InputNumber
                            size="large"
                            {...field}
                            placeholder={placeholder || label}
                            prefix={icon}
                            id={name}
                            type={type}
                            className="w-full"
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
