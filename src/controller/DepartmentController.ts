import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Department } from "../entity/Department";

export class DepartmentController {
    private departmentRepository = AppDataSource.getRepository(Department);

    async getAllDepartments(request: Request, response: Response, next: NextFunction) {
        return this.departmentRepository.find();
    }

    async getDepartmentById(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const department = await this.departmentRepository.findOne({
            where: { id }
        })

        if (!department) {
            return `no department with the id '${id}' was found`;
        }

        return department;
    }

    async createDepartment(request: Request, response: Response, next: NextFunction) {
        const { departmentName } = request.body;

        const department = Object.assign(new Department(), {
            departmentName
        })

        return this.departmentRepository.save(department);
    }
}

