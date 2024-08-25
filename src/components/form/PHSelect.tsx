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
