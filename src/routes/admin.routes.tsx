import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import StudentData from "../pages/admin/userManagement/studentData";
import Services from "../pages/admin/servicesManagement/Services";
export const AdminPath = [
    {
        name: "Dashboard",
        path: "/admin",
        element: <AdminDashboard />,
    },
    {
        name: "Service Management",
        path: "services",
        element: <Services />,
    },
    // {
    //     name: "Service Management",
    //     children: [
    //         {
    //             name: "Services",
    //             path: "services",
    //             element: <Services />,
    //         },
    //         {
    //             name: "Create Academic Semester",
    //             path: "create-academic-semester",
    //             element: <CreateAcademicSemester />,
    //         },
    //         {
    //             name: "Academic Department",
    //             path: "academic-department",
    //             element: <AcademicDepartment />,
    //         },
    //         {
    //             name: "Create Academic Department",
    //             path: "create-academic-department",
    //             element: <CreateAcademicDepartment />,
    //         },
    //         {
    //             name: "Academic Faculty",
    //             path: "academic-faculty",
    //             element: <AcademicFaculty />,
    //         },
    //         {
    //             name: "Create Academic Faculty",
    //             path: "create-academic-faculty",
    //             element: <CreateAcademicFaculty />,
    //         },
    //     ],
    // },
    {
        name: "User Management",
        children: [
            {
                name: "Create Student",
                path: "create-student",
                element: <CreateStudent />,
            },
            {
                name: "Students",
                path: "students",
                element: <StudentData />,
            },
            {
                name: "Create Faculty",
                path: "create-faculty",
                element: <CreateFaculty />,
            },
            {
                name: "Create Admin",
                path: "create-admin",
                element: <CreateAdmin />,
            },
        ],
    },
];
