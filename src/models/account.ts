import { ObjectId } from "mongodb";

// Creating account template
export default interface Account {
    simpleId?: number,
    name: string,
    createdOn?: Date,
    owner: string,
    id?: ObjectId
}