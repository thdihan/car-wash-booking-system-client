import { Checkbox, Form } from "antd";
import { Controller } from "react-hook-form";

export const PHCheckbox = ({
    name,
    placeholder,
    label = "Text",
    options,
}: {
    name: string;
    placeholder?: string;
    label?: string;
    type?: string;
    options: { value: string; label: string }[] | undefined;
}) => {
    return (
        <div>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Checkbox.Group
                            {...field}
                            options={options}
                            defaultValue={["Apple"]}
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
