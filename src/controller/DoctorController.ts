import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Doctor } from "../entity/Doctor";
import { Department } from "../entity/Department";

export class DoctorController {
    private doctorRepository = AppDataSource.getRepository(Doctor);
    private departmentRepository = AppDataSource.getRepository(Department);

    async getAllDoctors(request: Request, response: Response, next: NextFunction) {
        return this.doctorRepository.find();
    }

    async getDoctorById(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const doctor = await this.doctorRepository.findOne({
            where: { id }
        })

        if (!doctor) {
            return `no doctor with the id '${id}' was found`;
        }

        return doctor;
    }

    async createDoctor(request: Request, response: Response, next: NextFunction) {
        const { ssn, firstName, lastName, departmentId } = request.body;

        // Find the department to be associated with the doctor
        const department = await this.departmentRepository.findOneBy({ id: departmentId })
        if (!department) {
            return "No department with the id was found, please provide a valid id";
        }

        const doctor = Object.assign(new Doctor(), {
            ssn, firstName, lastName, department
        })

        return this.doctorRepository.save(doctor);
    }


}

