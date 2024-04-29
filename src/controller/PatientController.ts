import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Patient } from "../entity/Patient"
import { Admission } from "../entity/Admission";
import { Doctor } from "../entity/Doctor";

export class PatientController {

    private patientRepository = AppDataSource.getRepository(Patient);
    private admissionRepository = AppDataSource.getRepository(Admission);
    private doctorRepository = AppDataSource.getRepository(Doctor);


    async getPatient(request: Request, response: Response, next: NextFunction) {
        const ssn = request.params.ssn;
        const doctorId = request.params.doctorId;

        // Check if patient exists 
        const patient = await this.patientRepository.findOne({
            where: { ssn },
        })
        if (!patient) {
            return `no patient with the SSN '${ssn}' was found`;
        }


        // Check if patient has an admission
        const admission = await this.admissionRepository.findOne({
            where: { patient },
            relations: ['department', 'doctors']
        })
        if (!admission) {
            return `There is no admission for the patient with the SSN '${ssn}'`;
        }


        /**
         * VALIDATE DOCTOR ACCESS: 
         * 
         * A Doctor has access to a Patient (journal) if one of these two criterias are met:
         * (1) The Doctor is associated with the admission, this gives relevant doctors outside the department access to the Patient when neccessary
         * (2) The Doctor is in the same department the Patient is admitted to, this gives all doctors within the relevent department access to the Patient
         * 
         * Note: It could also be restructured so only doctors who fulfill both criterias can access the Patient. I have not done this since it excludes all doctors 
         * from outside departments, and I imagine there could be instances where a Patient is admitted to one department, but needs doctors from multiple departments.
        */


        // Check if doctor is associated with patient through the admission
        const isDoctorPatientAssociated = admission.doctors.some(doctor => doctor.id === Number(doctorId));

        if (isDoctorPatientAssociated) {
            return patient;
        }


        // Check if the doctor is associated with patient through shared department
        const doctor = await this.doctorRepository.findOne({
            where: { id: doctorId },
            relations: ['department']
        });

        if (doctor.department?.id === admission.department.id) {
            return patient
        }

        // Error message if the Doctor does not have access to the Patient
        return `The doctor with id '${doctorId}' does not have access to the Patient`;
    }



    async createPatient(request: Request, response: Response, next: NextFunction) {
        const { ssn, firstName, lastName } = request.body;

        const patient = Object.assign(new Patient(), {
            ssn, firstName, lastName
        })

        return this.patientRepository.save(patient);
    }
}