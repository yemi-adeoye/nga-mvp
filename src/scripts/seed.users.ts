import { db } from "../db/index.js";
import { userTable } from "../db/schema/auth/schema.users.js";

async function seed() {

    await db.insert(userTable).values([
        {
            username: "john",
            firstName: "John",
            lastName: "Doe",
            fullName: "John Doe",
            password: "password123"
        },
        {
            username: "mary",
            firstName: "Mary",
            lastName: "Smith",
            fullName: "Mary Smith",
            password: "password123"
        },
        {
            username: "peter",
            firstName: "Peter",
            lastName: "Johnson",
            fullName: "Peter Johnson",
            password: "password123"
        },
        {
            username: "jane",
            firstName: "Jane",
            lastName: "Williams",
            fullName: "Jane Williams",
            password: "password123"
        },
        {
            username: "michael",
            firstName: "Michael",
            lastName: "Brown",
            fullName: "Michael Brown",
            password: "password123"
        },
        {
            username: "david",
            firstName: "David",
            lastName: "Jones",
            fullName: "David Jones",
            password: "password123"
        },
        {
            username: "sarah",
            firstName: "Sarah",
            lastName: "Miller",
            fullName: "Sarah Miller",
            password: "password123"
        },
        {
            username: "emma",
            firstName: "Emma",
            lastName: "Wilson",
            fullName: "Emma Wilson",
            password: "password123"
        },
        {
            username: "daniel",
            firstName: "Daniel",
            lastName: "Taylor",
            fullName: "Daniel Taylor",
            password: "password123"
        },
        {
            username: "olivia",
            firstName: "Olivia",
            lastName: "Anderson",
            fullName: "Olivia Anderson",
            password: "password123"
        }
    ]);

    console.log("Seed complete.");
}

seed().catch(console.error);