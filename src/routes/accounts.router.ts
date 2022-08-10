import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Account from "../models/account";
import {KeyObjectType} from "crypto";

export const accountsRouter = express.Router();

accountsRouter.use(express.json());

accountsRouter.get("/accounts/", async (_req: Request, res: Response) => {
    // Handle errors
    try {
        // Get all accounts from the database
        const accounts = await collections.accounts!.find({}).toArray();

        res.status(200).send(accounts);
    } catch (error: any) {

        // Display error message and exit process
        res.status(500).send(error.message);
    }
});

// GET routes
// Find single account by id
accountsRouter.get("/accounts/:id", async (req: Request, res: Response) => {
    // Handle requested ID
    const id = req?.params?.id;
    console.log(id)

    try {
        // Find by ID
        const account = await collections.accounts!.findOne({ simpleId: id });

        if (account) {
            res.status(200).send(account);
        }
    } catch (error) {

        // Display error message and exit process
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);

    }
});

// Insert query
accountsRouter.post("/accounts/", async (req: Request, res: Response) => {
    try {
        // Template
        const newAccount = req.body as Account;

        // Get last account's id
        const lastAccount = await collections.accounts!.find().sort({simpleId: -1}).limit(1).toArray();

        // Set new account's id
        newAccount.simpleId = (lastAccount[0]) ? lastAccount[0].simpleId + 1 : 0;

        // Set date
        newAccount.createdOn = new Date();


        // Insert
        const result = await collections.accounts!.insertOne(newAccount);

        result
            ? res.status(201).send(`Successfully created a account with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new account.");
    } catch (error: any) {

        // Display error message and exit process
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT route
accountsRouter.put("/accounts/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedAccount: Account = req.body as Account;
        const query = { _id: new ObjectId(id) };

        // Update query
        const result = await collections.accounts!.updateOne(query, { $set: updatedAccount });

        result
            ? res.status(200).send(`Successfully updated account with id ${id}`)
            : res.status(304).send(`Account with id: ${id} not updated`);
    } catch (error: any) {

        // Display error message and exit process
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE route
accountsRouter.delete("/accounts/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.accounts!.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed account with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove account with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Account with id ${id} does not exist`);
        }
    } catch (error: any) {

        // Display error message and exit process
        console.error(error.message);
        res.status(400).send(error.message);
    }
});