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
