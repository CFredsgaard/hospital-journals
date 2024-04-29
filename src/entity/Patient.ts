import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity('patients')
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        length: 10
    })
    ssn: string

    @Column()
    firstName: string

    @Column()
    lastName: string
}
