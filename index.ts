import express from "express";
import { connectToDatabase } from "./src/services/database.service"
import { accountsRouter } from "./src/routes/accounts.router";
import * as dotenv from "dotenv";

// Pull the data from .env file
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

connectToDatabase()
    .then(() => {
        // Listen for accounts requests from http://localhost:8080/api/
        app.use("/api/", accountsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit(1);
    });