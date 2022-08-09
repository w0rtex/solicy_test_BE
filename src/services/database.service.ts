import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { accounts?: mongoDB.Collection } = {};

export async function connectToDatabase () {

    // Pull the data from .env file
    dotenv.config();

    // Casting .env data to variables
    const connectionString: string = process.env.DB_CONN_STRING!;
    const databaseName: string = process.env.DB_NAME!;
    const collectionName: string = process.env.ACCOUNTS_COLLECTION_NAME!;

    // Connecting to the MongoDB
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);

    client.connect((err) => {

        // Catching errors
        if (err) {
            // Display error message and exit process
            console.log(err);
            process.exit(1);
        } else {
            console.log("Connected to the database");

            const db: mongoDB.Db = client.db(databaseName);
            const accountsCollection: mongoDB.Collection = db.collection(collectionName);

            collections.accounts = accountsCollection;

            // Display success message
            console.log(`Successfully connected to database: ${db.databaseName} and collection: ${accountsCollection.collectionName}`);
        }
    });
}