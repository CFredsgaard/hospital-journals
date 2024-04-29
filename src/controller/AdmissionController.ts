import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Admission } from "../entity/Admission";
import { Patient } from "../entity/Patient";
import { Department } from "../entity/Department";
import { Doctor } from "../entity/Doctor";
import { In } from "typeorm";

export class AdmissionController {
    private admissionRepository = AppDataSource.getRepository(Admission);
    private patientRepository = AppDataSource.getRepository(Patient);
    private departmentRepository = AppDataSource.getRepository(Department);
    private doctorRepository = AppDataSource.getRepository(Doctor);

    // Create Admimssion
    async createAdmission(request: Request, response: Response, next: NextFunction) {
        const { patientId, departmentId, doctorIds } = request.body;

        // Find patient to add to admission 
        const patient = await this.patientRepository.findOneBy({ id: patientId });
        if (!patient) {
            return "Admission creation failed: no patient found with the id";
        }

        // Check if admissions already has an admission for the patient, a patient can only have one admission at a time
        const patientHasAdmission = await this.admissionRepository.findOneBy({ id: patientId });
        if (patientHasAdmission) {
            return "The patient already has an admission";
        }

        // Find department to add to admission
        const department = await this.departmentRepository.findOne({ where: departmentId });
        if (!department) {
            return "Admission creation failed: no department found with the id";
        }

        // Find doctors, if there are any
        const doctors = doctorIds.length > 0 ? await this.doctorRepository.findBy({ id: In(doctorIds) }) : [];

        // Create the new admission
        const admission = Object.assign(new Admission(), {
            patient, department, doctors
        })

        return this.admissionRepository.save(admission);
    }
}

