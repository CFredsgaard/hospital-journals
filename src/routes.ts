import { PatientController } from "./controller/PatientController"
import { DepartmentController } from "./controller/DepartmentController"
import { DoctorController } from "./controller/DoctorController"
import { AdmissionController } from "./controller/AdmissionController"


export const Routes = [

    // Patient Routes 
    {
        method: "get",
        route: "/patients/:ssn/doctor/:doctorId",
        controller: PatientController,
        action: "getPatient"
    }, {
        method: "post",
        route: "/patients",
        controller: PatientController,
        action: "createPatient"
    },

    // Doctor Routes
    {
        method: "get",
        route: "/doctors",
        controller: DoctorController,
        action: "getAllDoctors"
    }, {
        method: "get",
        route: "/doctors/:id",
        controller: DoctorController,
        action: "getDoctorById"
    }, {
        method: "post",
        route: "/doctors",
        controller: DoctorController,
        action: "createDoctor"
    },

    // Department Routes
    {
        method: "get",
        route: "/departments",
        controller: DepartmentController,
        action: "getAllDepartments"
    }, {
        method: "get",
        route: "/departments/:id",
        controller: DepartmentController,
        action: "getDepartmentById"
    }, {
        method: "post",
        route: "/departments",
        controller: DepartmentController,
        action: "createDepartment"
    },

    // Admission Routes
    {
        method: "post",
        route: "/admissions",
        controller: AdmissionController,
        action: "createAdmission"
    }
]