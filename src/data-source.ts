import "reflect-metadata"
import { DataSource } from "typeorm"
import { Patient } from "./entity/Patient"
import { Doctor } from "./entity/Doctor"
import { Admission } from "./entity/Admission"
import { Department } from "./entity/Department"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Patient, Doctor, Admission, Department],
    migrations: [],
    subscribers: [],
})
