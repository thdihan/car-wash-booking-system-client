import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthsOptions, yearOptions } from "../../../constant/global";
import { semesterOptions } from "../../../constant/semesters";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicSemesterSchema } from "../../../schemas/academicSemesterSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const CreateAcademicSemester = () => {
    const [addAcademicSemester] = useAddAcademicSemesterMutation();
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Adding academic semester...");
        const name = semesterOptions.find(
            (option) => option.value === data.code
        )?.label;
        const semester = {
            name,
            code: data.code,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth,
        };

        try {
            console.log(semester);
            const result = (await addAcademicSemester(semester)) as TResponse;
            if (result.error) {
                toast.error(result?.error?.data!.message, {
                    id: toastId,
                });
                // throw new Error("Failed to add academic semester");
                return;
            }
            toast.success("Academic semester added successfully", {
                id: toastId,
            });
            console.log("Succesfully added: ", result);
        } catch (error) {
            console.error("Failed to add academic semester", error);
            toast.error("Failed to add academic semester", {
                id: toastId,
            });
        }
    };

    return (
        <Flex align="center" justify="center">
            <Col span={6}>
                <PHForm
                    onSubmit={handleSubmit}
                    resolver={zodResolver(AcademicSemesterSchema)}
                >
                    <PHSelect
                        name="code"
                        label="Name"
                        options={semesterOptions}
                    />
                    <PHSelect name="year" label="Year" options={yearOptions} />
                    <PHSelect
                        name="startMonth"
                        label="Start Month"
                        options={monthsOptions}
                    />
                    <PHSelect
                        name="endMonth"
                        label="End Month"
                        options={monthsOptions}
                    />

                    <Button size="large" htmlType="submit">
                        Submit
                    </Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;
