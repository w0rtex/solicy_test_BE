"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountsRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
exports.accountsRouter = express_1.default.Router();
exports.accountsRouter.use(express_1.default.json());
exports.accountsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle errors
    try {
        // Get all accounts from the database
        const accounts = yield database_service_1.collections.accounts.find({}).toArray();
        res.status(200).send(accounts);
    }
    catch (error) {
        // Display error message and exit process
        res.status(500).send(error.message);
    }
}));
// GET routes
// Find single account by id
exports.accountsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Handle requested ID
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        // Find by ID
        const account = yield database_service_1.collections.accounts.findOne(query);
        if (account) {
            res.status(200).send(account);
        }
    }
    catch (error) {
        // Display error message and exit process
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// Insert query
exports.accountsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Template
        const newAccount = req.body;
        // Get last account's id
        const lastAccount = yield database_service_1.collections.accounts.find().sort({ simpleId: -1 }).limit(1).toArray();
        // Set new account's id
        newAccount.simpleId = (lastAccount[0]) ? lastAccount[0].simpleId + 1 : 0;
        // Set date
        newAccount.createdOn = new Date();
        // Insert
        const result = yield database_service_1.collections.accounts.insertOne(newAccount);
        result
            ? res.status(201).send(`Successfully created a account with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new account.");
    }
    catch (error) {
        // Display error message and exit process
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// PUT route
exports.accountsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const updatedAccount = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        // Update query
        const result = yield database_service_1.collections.accounts.updateOne(query, { $set: updatedAccount });
        result
            ? res.status(200).send(`Successfully updated account with id ${id}`)
            : res.status(304).send(`Account with id: ${id} not updated`);
    }
    catch (error) {
        // Display error message and exit process
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
// DELETE route
exports.accountsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.accounts.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed account with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove account with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Account with id ${id} does not exist`);
        }
    }
    catch (error) {
        // Display error message and exit process
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
