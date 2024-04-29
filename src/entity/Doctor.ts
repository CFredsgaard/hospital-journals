import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, ManyToMany } from "typeorm"
import { Department } from "./Department"
import { Admission } from "./Admission"

@Entity('doctors')
export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    // Relation: A doctor has one Department 
    @ManyToOne(
        () => Department,
        department => department.doctors
    )
    department: Department

    // Relation: A doctor has 0 or many admissions
    @ManyToMany(
        () => Admission,
        admission => admission.doctors,
        { nullable: true }
    )
    admissions?: Admission[] | null
}
