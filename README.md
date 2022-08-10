# Back End of demo project for Solicy.

For back-end, I've decided to use `Express` and `TypeScript`. Database is `Mongo` and to communicate with it I've used `mongodb` library. 

## Routes
All routes are located in the `src/routes` folder. 
I've made the following routes:

[GET] `/accounts` + `/` - to get all accounts\
[POST] `/accounts` + `/:id` - to get single account\
[PUT] `/accounts` + `/:id` - to update account\
[DELETE] `/accounts` + `/:id` - to delete account

## Installation

Use `[npm]` to install all dependencies.
```bash
npm install
```

## Used libraries

As I already mentioned I've used `Express` for REST and `MongoDB` as a database.
Also, I used `dotenv` to fetch important variables from `.env` file in order to prevent any info leaks (in production `.env` would be added into `.gitignore`, to prevent it from saving).


## Usage

To start the development server simply type

```javascript
npm run dev
```
in the terminal.

By default `REST` API will be accessible from `http://localhost:8000/api/`, to communicate with the accounts database I've created a few routes and they're accessible from `http://localhost:8000/api/accounts`

## Config
All env variables are located in `.env` in the root folder, including DB connection string, DB titles, and the port on which the project should start. The main port is :8000, the reserve is set to :8080

## License
`Getapnya Gyux, Aeracia, Yerevan.`
