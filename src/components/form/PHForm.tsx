import { Form } from "antd";
import { ReactNode } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";

type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
};
type TPHForm = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
    resolver?: any;
} & TFormConfig;
const PHForm = ({ onSubmit, children, resolver, defaultValues }: TPHForm) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }
    if (resolver) {
        // console.log("Setting Resolver");
        formConfig["resolver"] = resolver;
    }
    const methods = useForm(formConfig);

    const submit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        methods.reset();
    };

    return (
        <FormProvider {...methods}>
            <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;
