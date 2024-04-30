# Hospital Journals System

## Built with 
- Node.js
- Express
- TypeORM
- PostgreSQL
- PGAdmin


## Prerequisites
Before you begin, ensure you have met the following requirements:
- Docker and Docker Compose installed on your machine.


## Setup
Clone the repo and navigate into the directory:

1. `git clone https://github.com/CFredsgaard/hospital-journals.git`
2. `cd hospital-journal`


## Run the project

1. Run `docker compose up`
2. copy the url (http://localhost:3000) into Postman
3. Setup the different POST and GET requests using their descriptions below


## Post Requests
These are the post request paths and their bodies

### `POST /patients`
The `ssn` must be unique

```
{
    "ssn": "0712831680",
    "firstName": "Mary",
    "lastName": "Jane"
}
```

### `POST /departments`
```
{
    "departmentName": "Orthopedic"
}
```

### `POST /doctors`
There needs to be a department created for the Doctor
```
{
    "firstName": "Doctor",
    "lastName": "Karen",
    "departmentId": 1
}
```

### `POST /admissions`
An admission links patients to a department. The doctorIds can be left as an empty array if no doctors should be assocciated with the admission. 
The doctor and admission relationship is many-to-many. While the patien and admisssion relationship is one-to-one.
```
{
    "patientId": 1,
    "departmentId": 1,
    "doctorIds": [1,2]
}
```



## Get Requests

### `GET /patient/<ssn>/doctor/<doctorId>` 
The patient with the `<ssn>` is only returned if the `<doctorId>` corresponds to a doctor who has access to that patient

### `GET /departments`
Returns all departments

### `GET /departments/<id>`
Returns the department with the `<id>`

### `GET /doctors`
Returns all doctors

### `GET /doctors/<id>`
Returns the doctor with the `<id>`
