import express from "express";
import { connectToDatabase } from "./src/services/database.service"
import { accountsRouter } from "./src/routes/accounts.router";
import * as dotenv from "dotenv";

// Pull the data from .env file
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

connectToDatabase()
    .then(() => {
        // Listen for accounts requests from the main page
        app.use("/", accountsRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit(1);
    });