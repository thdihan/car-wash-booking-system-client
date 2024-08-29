import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const PHSelect = ({
    name,
    label = "Select",
    options,
    disabled,
}: {
    name: string;
    label?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    options: { value: string; label: string }[] | undefined;
}) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        {...field}
                        size="large"
                        style={{ width: "100%" }}
                        options={options}
                        disabled={disabled}
                        placeholder={`Select ${label}`}
                    />
                    {error && (
                        <small style={{ color: "red" }}>{error.message}</small>
                    )}
                </Form.Item>
            )}
        />
    );
};
export const PHSelectOnChange = ({
    name,
    label = "Select",
    options,
    disabled,
    onChange,
}: {
    name: string;
    label?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
    options: { value: string; label: string }[] | undefined;
}) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        {...field}
                        size="large"
                        style={{ width: "100%" }}
                        options={options}
                        disabled={disabled}
                        placeholder={`Select ${label}`}
                        onChange={onChange}
                    />
                    {error && (
                        <small style={{ color: "red" }}>{error.message}</small>
                    )}
                </Form.Item>
            )}
        />
    );
};

export default PHSelect;
