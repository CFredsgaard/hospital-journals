import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, BaseEntity, OneToOne, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { Doctor } from "./Doctor"
import { Department } from "./Department"
import { Patient } from "./Patient"

@Entity('admissions')
export class Admission extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    // Relation: one admission has one patient
    @OneToOne(
        () => Patient
    )
    @JoinColumn()
    patient: Patient

    // Relation: one admission has 0 or more doctors 
    @ManyToMany(
        () => Doctor,
        doctor => doctor.admissions,
        { nullable: true }
    )
    @JoinTable({
        name: 'admissions_doctors'
    })
    doctors?: Doctor[] | null

    // Relation: One admission has one department
    @ManyToOne(
        () => Department,
        department => department.admissions
    )
    department: Department
}