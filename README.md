# Storefront Backend Project

The database schema and and API route information can be found in the (REQUIREMENT.md)

# Project Name

## Project Setup Instructions

Follow the steps below to set up the project and get it running on your local environment.

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js (v16.16)**: https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi
- **PostgreSQL**: PostgreSQL 15
- **Database**: 2 database with name `project2` and `project2test`

### Steps to Setup and Connect to the Database

1. **Install packages**:

This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`yarn` or `npm install`

#### Packages included:

**Express**: 
`npm i -S express` 
`npm i -D @types/express`

**typescript**
`npm i -D typescript`

**dotenv**
`npm i dotenv`

**db-migrate**
`npm install -g db-migrate`

**cors**
`npm install --save cors`

**bcrypt**
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

**nodemon**
`npm i nodemon`

**jsonwebtoken**
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

**jasmine**
`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

**supertest**
`npm i supertest`
`npm i --save-dev @types/supertest`

After all packages installed, run `db-migrate up` to set up the database and get access via http://127.0.0.1:5432

`npm run build` to build the app

2. **Update Environment Variables**:
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables:
    ```env
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_DB=project2
    POSTGRES_TEST_DB=project2test 
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=Tuanquen1991@
    ENV=dev
    BCRYPT_PASSWORD=project2-hash-pash
    SALT_ROUNDS=10
    TOKEN_SECRECT=tunv35
    ```

3. **Start** 
`npm run start` to start the app and get access via http://127.0.0.1:


### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

### Testing
Run test with 

`npm run test`