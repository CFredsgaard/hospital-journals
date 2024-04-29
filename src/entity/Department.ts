import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm"
import { Doctor } from "./Doctor"
import { Admission } from "./Admission"

@Entity('departments')
export class Department extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    departmentName: string

    // Relation: One department has 0 or many doctors 
    @OneToMany(
        () => Doctor,
        doctor => doctor.department,
        { nullable: true }
    )
    doctors?: Doctor[] | null

    // Relation: One department has 0 or many admissions
    @OneToMany(
        () => Admission,
        admission => admission.department,
        { nullable: true }
    )
    admissions?: Admission[] | null
}
